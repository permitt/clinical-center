from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register('appointment', views.AppointmentViewSet)
router.register('operatingroom', views.OperatingRoomView, basename="operatingroom")
router.register('appointment-type', views.AppointmentTypeView)
router.register('holiday', views.HolidayRequestView, basename="holiday")


urlpatterns = [
        path('clinic/', views.ClinicListView.as_view()),
        path('appointment/check/', views.appointmentCheck),
        path('holiday/resolve/<int:pk>/', views.resolveRequest),
        *router.urls
    ]