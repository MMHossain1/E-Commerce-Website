import google.generativeai as genai
from rest_framework import serializers
from django.conf import settings


class AIChatMessageSerializer(serializers.Serializer):
    message = serializers.CharField()
    context = serializers.DictField(required=False, default=dict)


class AIRecommendationSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=False)
    category = serializers.CharField(required=False)
    preferences = serializers.DictField(required=False, default=dict)


class AIContextSerializer(serializers.Serializer):
    cart_items = serializers.ListField(required=False, default=list)
    browsing_history = serializers.ListField(required=False, default=list)
    purchase_history = serializers.ListField(required=False, default=list)
    user_preferences = serializers.DictField(required=False, default=dict)