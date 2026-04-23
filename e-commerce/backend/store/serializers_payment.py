from rest_framework import serializers


class StripePaymentIntentSerializer(serializers.Serializer):
    amount = serializers.IntegerField(min_value=100)  # Amount in cents
    currency = serializers.CharField(default='usd', max_length=3)
    metadata = serializers.DictField(required=False, default=dict)


class StripeWebhookSerializer(serializers.Serializer):
    id = serializers.CharField()
    object = serializers.CharField()
    api_version = serializers.CharField(required=False)
    created = serializers.IntegerField()
    data = serializers.DictField()
    type = serializers.CharField()


class PaymentMethodSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    type = serializers.CharField()
    card = serializers.DictField()
    is_default = serializers.BooleanField(default=False)


class PaymentSerializer(serializers.Serializer):
    payment_intent_id = serializers.CharField()
    amount = serializers.IntegerField()
    currency = serializers.CharField()
    status = serializers.CharField()
    receipt_url = serializers.URLField(required=False)


class CheckoutSessionSerializer(serializers.Serializer):
    line_items = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        )
    )
    success_url = serializers.URLField()
    cancel_url = serializers.URLField()
    customer_email = serializers.EmailField(required=False)
    metadata = serializers.DictField(required=False, default=dict)