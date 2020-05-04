from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
#router.register('clinic', views.ClinicListView)

urlpatterns = [
        path('clinic/', views.ClinicListView.as_view()),
        path('appointment-type/', views.AppointmentTypeListView.as_view()),
        path('operatingroom/', views.OperatingRoomView.as_view())
    ]