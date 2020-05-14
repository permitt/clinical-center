from rest_framework import permissions

class OperatingRoomPermissions(permissions.BasePermission):

    def __init__(self, allowed_methods=['GET', 'POST', 'DELETE', 'PUT']):
        super().__init__()
        self.allowed_methods=allowed_methods

    def has_permission(self, request, view):

        return hasattr(request.user, 'adminAccount')
        # if request.method == 'PUT' or request.method == 'PATCH':
        #     return hasattr(request.user, 'adminAccount')
        # elif request.method == "DELETE":
        #     return hasattr(request.user, 'adminAccount')
        # elif request.method == "GET":
        #     return hasattr(request.user, 'adminAccount')
        # else:
        #     return False
