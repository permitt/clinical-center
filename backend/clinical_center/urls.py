"""clinical_center URL Configuration
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/users/', include('users.urls')),
    path('api/clinics/', include('clinics.urls')),
    path('admin/', admin.site.urls),
]
