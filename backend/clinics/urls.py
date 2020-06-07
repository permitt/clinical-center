from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register('appointment', views.AppointmentViewSet)
router.register('operatingroom', views.OperatingRoomView, basename="operatingroom")
router.register('appointment-type', views.AppointmentTypeView)

urlpatterns = [
        path('clinic/', views.ClinicListView.as_view()),
        path('appointment/check/', views.appointmentCheck),
        *router.urls
    ]