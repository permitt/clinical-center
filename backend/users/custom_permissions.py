from rest_framework import permissions

class IsAdministrator(permissions.BasePermission):

    def __init__(self, allowed_methods):
        super().__init__()
        self.allowed_methods = allowed_methods

    def has_permission(self, request, view):
        try:
            # Ispod ide model Admininistrator klase
            permission = isinstance(request.user.account, str)
        except:
            permission = False
        return permission
