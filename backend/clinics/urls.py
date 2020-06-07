from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register('appointment', views.AppointmentViewSet, basename="appointment")
router.register('operatingroom', views.OperatingRoomView, basename="operatingroom")
router.register('appointment-type', views.AppointmentTypeView, basename="appointmenttype")
router.register('holiday', views.HolidayRequestView, basename="holiday")
router.register('healthcard', views.HealthCardView, basename="healthcard")
router.register('operation', views.OperationView, basename="opeartion")
router.register('clinic', views.ClinicListView)

urlpatterns = [
        path('appointment/check/', views.appointmentCheck),
        path('holiday/resolve/<int:pk>/', views.resolveRequest),
        path('appointment/schedule', views.scheduleAppointment),
        path('clinicreports/', views.reports),
        path('income/', views.income),
        path('adminclinic/', views.adminClinic),
        *router.urls
    ]