from rest_framework import permissions

class OperatingRoomPermissions(permissions.BasePermission):

    def __init__(self, allowed_methods=['GET', 'POST', 'DELETE', 'PUT']):
        super().__init__()
        self.allowed_methods=allowed_methods

    def has_permission(self, request, view):

        return hasattr(request.user, 'adminAccount')

class AppointmentTypePermissions(permissions.BasePermission):

    def __init__(self, allowed_methods=['GET', 'POST', 'DELETE', 'PUT']):
        super().__init__()
        self.allowed_methods=allowed_methods

    def has_permission(self, request, view):

        return hasattr(request.user, 'adminAccount') or hasattr(request.user,'patient')

