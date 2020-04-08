from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt import views as jwt_views

router = DefaultRouter()
router.register(r'patient', views.PatientViewset)

urlpatterns = [
    path('token/obtain/', views.MyTokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    *router.urls,
]
