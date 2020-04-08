"""clinical_center URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/', include('users.urls')),
    path('admin/', admin.site.urls),
]
