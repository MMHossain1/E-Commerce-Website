import stripe
import json
import hmac
import hashlib
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import Order, OrderItem
from .serializers_payment import (
    StripePaymentIntentSerializer, StripeWebhookSerializer,
    PaymentSerializer, CheckoutSessionSerializer
)


class PaymentViewSet(viewsets.ViewSet):
    """Stripe payment integration endpoints"""
    permission_classes = [AllowAny]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        stripe.api_key = settings.STRIPE_SECRET_KEY

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def create_payment_intent(self, request):
        """Create a Stripe PaymentIntent for checkout"""
        serializer = StripePaymentIntentSerializer(data=request.data)
        if serializer.is_valid():
            try:
                intent = stripe.PaymentIntent.create(
                    amount=serializer.validated_data['amount'],
                    currency=serializer.validated_data.get('currency', 'usd'),
                    metadata=serializer.validated_data.get('metadata', {}),
                    automatic_payment_methods={'enabled': True},
                )
                return Response({
                    'client_secret': intent.client_secret,
                    'payment_intent_id': intent.id,
                })
            except stripe.error.StripeError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def create_checkout_session(self, request):
        """Create a Stripe Checkout Session"""
        serializer = CheckoutSessionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                session_params = {
                    'line_items': serializer.validated_data['line_items'],
                    'mode': 'payment',
                    'success_url': serializer.validated_data['success_url'],
                    'cancel_url': serializer.validated_data['cancel_url'],
                }
                
                if serializer.validated_data.get('customer_email'):
                    session_params['customer_email'] = serializer.validated_data['customer_email']
                
                if serializer.validated_data.get('metadata'):
                    session_params['metadata'] = serializer.validated_data['metadata']
                
                session = stripe.checkout.Session.create(**session_params)
                return Response({
                    'session_id': session.id,
                    'url': session.url,
                })
            except stripe.error.StripeError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def webhook(self, request):
        """Handle Stripe webhooks"""
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        
        try:
            if settings.STRIPE_WEBHOOK_SECRET:
                event = stripe.Webhook.construct_event(
                    payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
                )
            else:
                event = json.loads(payload)
            
            # Handle the event
            if event['type'] == 'payment_intent.succeeded':
                self._handle_payment_success(event['data']['object'])
            elif event['type'] == 'payment_intent.payment_failed':
                self._handle_payment_failure(event['data']['object'])
            elif event['type'] == 'checkout.session.completed':
                self._handle_checkout_complete(event['data']['object'])
            
            return Response({'status': 'success'})
            
        except ValueError as e:
            return Response({'error': 'Invalid payload'}, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            return Response({'error': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def payment_methods(self, request):
        """Get saved payment methods for user"""
        try:
            customer = stripe.Customer.list(email=request.user.email).data
            if customer:
                payment_methods = stripe.PaymentMethod.list(
                    customer=customer[0].id,
                    type='card'
                )
                return Response({
                    'payment_methods': [
                        {
                            'id': pm.id,
                            'type': pm.type,
                            'card': {
                                'brand': pm.card.brand,
                                'last4': pm.card.last4,
                                'exp_month': pm.card.exp_month,
                                'exp_year': pm.card.exp_year,
                            }
                        }
                        for pm in payment_methods.data
                    ]
                })
            return Response({'payment_methods': []})
        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def attach_payment_method(self, request):
        """Attach a payment method to a customer"""
        payment_method_id = request.data.get('payment_method_id')
        if not payment_method_id:
            return Response({'error': 'Payment method ID required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Create or get customer
            customers = stripe.Customer.list(email=request.user.email).data
            if customers:
                customer = customers[0]
            else:
                customer = stripe.Customer.create(
                    email=request.user.email,
                    name=f"{request.user.first_name} {request.user.last_name}"
                )
            
            # Attach payment method to customer
            payment_method = stripe.PaymentMethod.attach(
                payment_method_id,
                customer=customer.id
            )
            
            return Response({
                'message': 'Payment method attached',
                'payment_method': {
                    'id': payment_method.id,
                    'type': payment_method.type,
                }
            })
        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def _handle_payment_success(self, payment_intent):
        """Handle successful payment"""
        metadata = payment_intent.get('metadata', {})
        order_id = metadata.get('order_id')
        if order_id:
            try:
                order = Order.objects.get(id=order_id)
                order.status = 'processing'
                order.save()
            except Order.DoesNotExist:
                pass

    def _handle_payment_failure(self, payment_intent):
        """Handle failed payment"""
        metadata = payment_intent.get('metadata', {})
        order_id = metadata.get('order_id')
        if order_id:
            try:
                order = Order.objects.get(id=order_id)
                order.status = 'cancelled'
                order.save()
            except Order.DoesNotExist:
                pass

    def _handle_checkout_complete(self, session):
        """Handle completed checkout session"""
        metadata = session.get('metadata', {})
        order_id = metadata.get('order_id')
        if order_id:
            try:
                order = Order.objects.get(id=order_id)
                order.status = 'processing'
                order.save()
            except Order.DoesNotExist:
                pass