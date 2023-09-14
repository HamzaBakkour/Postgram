#CoreRoot/urls
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, \
                                        SpectacularRedocView, \
                                        SpectacularSwaggerView
from django.conf import settings
from django.conf.urls.static import static
from core.verify_email.views import verify_user_and_activate

urlpatterns = [


        path('admin/',
                admin.site.urls),


        path('api/',
                include(('core.routers', 'core'),
                        namespace = "core-api")),

        path("api/scheam/",
                SpectacularAPIView.as_view(),
                name = "schema"),

        path("api/schema/redoc/",
                SpectacularRedocView.as_view(url_name="schema"),
                name="redoc",), 

        path("api/schema/swagger-ui/",
                SpectacularSwaggerView.as_view(url_name="schema"),
                name="swagger-ui"), 

        path("verification/",
                include (('core.verify_email.urls', 'verify_email.apps.VerifyEmailConfig'),
                        namespace= "verify-email"),),

        path(f'api/password_reset/',
                include(('core.password_reset.urls', 'core'),
                namespace='password_reset')),

]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)