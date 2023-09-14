#core/auth/viewsets/register.py
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from core.auth.serializers import RegisterSerializer
from core.verify_email.email_handler import send_verification_email

import logging
log = logging.getLogger(__name__)

class RegisterViewSet(ViewSet):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data = request.data)

        serializer.is_valid(raise_exception = True)
        
        inactive_user = send_verification_email(request, serializer)                    

        refresh = RefreshToken.for_user(inactive_user)

        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        
        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"]
        },
            status = status.HTTP_201_CREATED
        )