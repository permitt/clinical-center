from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register('appointment', views.AppointmentViewSet)

urlpatterns = [
        path('clinic/', views.ClinicListView.as_view()),
        path('appointment-type/', views.AppointmentTypeListView.as_view()),
        path('appointment/check/', views.appointmentCheck),
        path('operatingroom/', views.OperatingRoomView.as_view()),
        *router.urls
    ]