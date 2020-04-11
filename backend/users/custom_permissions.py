from rest_framework import permissions

class CustomPatientPermissions(permissions.BasePermission):

    def __init__(self, allowed_methods):
        super().__init__()
        self.allowed_methods = allowed_methods

    # def has_permission(self, request, view):
    #     try:
    #         # Ispod ide model Admininistrator klase
    #         permission = isinstance(request.user.account, str)
    #     except:
    #         permission = False
    #     return permission

    def has_object_permission(self, request, view, obj):
        if request.method == 'PUT' or request.method == 'PATCH':
            # If the profile is approved by Administrator and the logged in user is trying to access it
            if obj.approved == True and obj.account == request.user:
                return True
            # Only Administrator
            if isinstance(request.user.account, str):
                return True
            return False
        elif request.method == "DELETE":
            # Only Administrator
            return isinstance(request.user.account, str)
        elif request.method == "GET":
            return request.user and request.user.is_authenticated
        else:
            return True


