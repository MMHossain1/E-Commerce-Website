from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CategoryViewSet, ProductViewSet, OrderViewSet
from .views_auth import AuthViewSet
from .views_payment import PaymentViewSet
from .views_ai import AIAssistantViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'ai', AIAssistantViewSet, basename='ai')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
