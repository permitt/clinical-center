from django.urls import path
from rest_framework import routers
from . import views
from rest_framework_simplejwt import views as jwt_views

router = routers.SimpleRouter()
router.register('patient', views.PatientViewset)

urlpatterns = [
    path('token/obtain/', views.MyTokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    *router.urls,
]