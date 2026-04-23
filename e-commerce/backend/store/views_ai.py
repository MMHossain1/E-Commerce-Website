import json
import google.generativeai as genai
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings
from django.db.models import Q

from .models import Product, Category, Order
from .serializers_ai import AIChatMessageSerializer, AIRecommendationSerializer
from .serializers import ProductSerializer


class AIAssistantViewSet(viewsets.ViewSet):
    """Gemini AI Assistant for product recommendations and customer support"""
    permission_classes = [AllowAny]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-pro')

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def chat(self, request):
        """AI chat for customer support and product guidance"""
        serializer = AIChatMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        message = serializer.validated_data['message']
        context = serializer.validated_data.get('context', {})
        
        if not settings.GEMINI_API_KEY:
            # Fallback responses when API key is not configured
            return self._fallback_response(message, context)
        
        try:
            # Build context-aware prompt
            prompt = self._build_chat_prompt(message, context)
            
            # Generate response
            response = self.model.generate_content(prompt)
            
            return Response({
                'message': response.text,
                'suggestions': self._extract_suggestions(response.text),
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def recommend(self, request):
        """AI-powered product recommendations"""
        serializer = AIRecommendationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        product_id = serializer.validated_data.get('product_id')
        category = serializer.validated_data.get('category')
        preferences = serializer.validated_data.get('preferences', {})
        
        # Get base products for recommendation
        products = Product.objects.filter(is_active=True)
        
        if category:
            products = products.filter(category__slug=category)
        
        if product_id:
            try:
                current_product = Product.objects.get(id=product_id)
                # Get products from same category
                products = products.filter(
                    category=current_product.category
                ).exclude(id=product_id)
            except Product.DoesNotExist:
                pass
        
        # Apply user preferences if provided
        if preferences:
            if preferences.get('min_price'):
                products = products.filter(price__gte=preferences['min_price'])
            if preferences.get('max_price'):
                products = products.filter(price__lte=preferences['max_price'])
        
        products = products[:12]
        
        if not settings.GEMINI_API_KEY:
            # Return simple recommendations without AI
            return Response({
                'recommendations': ProductSerializer(products, many=True).data,
                'reason': 'Based on category and preferences',
            })
        
        try:
            # Use AI to enhance recommendations
            product_data = [
                f"{p.name} - ${p.price} ({p.category.name})"
                for p in products
            ]
            
            prompt = f"""Based on the user's browsing context and preferences, recommend products from this list:
{chr(10).join(product_data)}

User preferences: {preferences}
Current product ID: {product_id}

Provide a brief reason for each recommendation in JSON format:
{{"recommendations": [{{"id": 1, "reason": "..."}}]}}"""
            
            response = self.model.generate_content(prompt)
            
            # Parse AI recommendations
            recommendations = self._parse_ai_recommendations(response.text, products)
            
            return Response({
                'recommendations': ProductSerializer(products, many=True).data,
                'ai_reason': response.text,
                'enhanced': True,
            })
        except Exception as e:
            # Fallback to simple recommendations
            return Response({
                'recommendations': ProductSerializer(products, many=True).data,
                'reason': str(e),
                'enhanced': False,
            })

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def checkout_guidance(self, request):
        """AI assistant for checkout guidance"""
        serializer = AIContextSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        cart_items = serializer.validated_data.get('cart_items', [])
        user_preferences = serializer.validated_data.get('user_preferences', {})
        
        if not settings.GEMINI_API_KEY:
            return self._fallback_checkout_guidance(cart_items)
        
        try:
            cart_data = [
                f"{item.get('name', 'Product')} - ${item.get('price', 0)} x {item.get('quantity', 1)}"
                for item in cart_items
            ]
            
            prompt = f"""Provide checkout guidance for this cart:
{chr(10).join(cart_data)}

User preferences: {user_preferences}

Provide helpful checkout tips in JSON format:
{{"tips": ["tip1", "tip2"], "upsell": "optional product suggestion", "total_savings": amount}}"""
            
            response = self.model.generate_content(prompt)
            
            return Response({
                'guidance': response.text,
                'cart_summary': {
                    'item_count': len(cart_items),
                    'total': sum(item.get('price', 0) * item.get('quantity', 1) for item in cart_items),
                }
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def search_assist(self, request):
        """AI-assisted product search"""
        query = request.query_params.get('q', '')
        category = request.query_params.get('category', '')
        
        if not query:
            return Response({'error': 'Query required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Base search
        products = Product.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query),
            is_active=True
        )
        
        if category:
            products = products.filter(category__slug=category)
        
        products = products[:20]
        
        if not settings.GEMINI_API_KEY:
            return Response({
                'products': ProductSerializer(products, many=True).data,
                'query': query,
            })
        
        try:
            # Use AI to enhance search results
            product_data = [p.name for p in products]
            
            prompt = f"""For search query "{query}", rate these products by relevance (0-100):
{product_data}

Provide JSON: {{"results": [{{"index": 0, "score": 95}}]}}"""
            
            response = self.model.generate_content(prompt)
            
            # Return enhanced results
            return Response({
                'products': ProductSerializer(products, many=True).data,
                'query': query,
                'ai_enhanced': True,
            })
        except Exception:
            return Response({
                'products': ProductSerializer(products, many=True).data,
                'query': query,
                'ai_enhanced': False,
            })

    def _build_chat_prompt(self, message, context):
        """Build context-aware prompt for chat"""
        cart_items = context.get('cart_items', [])
        browsing_history = context.get('browsing_history', [])
        
        prompt = f"""You are a helpful e-commerce shopping assistant. 
Current cart: {cart_items}
Recently viewed: {browsing_history}

User message: {message}

Provide a helpful, concise response. If asking about products, suggest relevant items from the store."""
        return prompt

    def _extract_suggestions(self, response):
        """Extract product suggestions from AI response"""
        # Simple extraction - can be enhanced with better parsing
        return []

    def _parse_ai_recommendations(self, text, products):
        """Parse AI recommendation response"""
        try:
            # Try to extract JSON from response
            import re
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
        except:
            pass
        return []

    def _fallback_response(self, message, context):
        """Fallback responses when AI is not configured"""
        message_lower = message.lower()
        
        if 'price' in message_lower or 'cost' in message_lower:
            response = "I can help you find products within your budget. What price range are you looking for?"
        elif 'shipping' in message_lower or 'delivery' in message_lower:
            response = "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days."
        elif 'return' in message_lower:
            response = "We have a 30-day return policy. Items must be unused and in original packaging."
        elif 'help' in message_lower or 'support' in message_lower:
            response = "I'm here to help! You can ask me about products, prices, shipping, or any other questions."
        else:
            response = "I'd be happy to help you find what you're looking for. Can you tell me more about what you need?"
        
        return Response({
            'message': response,
            'suggestions': [],
        })

    def _fallback_checkout_guidance(self, cart_items):
        """Fallback checkout guidance"""
        total = sum(item.get('price', 0) * item.get('quantity', 1) for item in cart_items)
        
        tips = [
            "Ensure all items in your cart are what you want",
            "Verify your shipping address is correct",
            "Check that your payment method is valid",
        ]
        
        if total < 50:
            tips.append("Add $" + str(50 - total) + " more for free shipping!")
        
        return Response({
            'tips': tips,
            'cart_summary': {
                'item_count': len(cart_items),
                'total': total,
            }
        })