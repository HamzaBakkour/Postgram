#core/routers
from rest_framework_nested import routers
from core.user.viewsets import UserViewSet
from core.auth.viewsets import RegisterViewSet, \
                                LoginViewSet, \
                                RefershViewSet
from core.post.viewsets import PostViewSet
from core.comment.viewsets import CommentViewSet
from core.verify_email.views import change_password
from django.urls import path
from django.urls import path, include



router = routers.SimpleRouter()

router.register(r'user',
                UserViewSet,
                basename = 'user')

router.register(r'auth/register',
                RegisterViewSet,
                basename = 'auth-register')

router.register(r'auth/login',
                LoginViewSet,
                basename = 'auth-login')

router.register(r'auth/refresh',
                RefershViewSet,
                basename = 'auth-refresh')

router.register(r'post',
                PostViewSet,
                basename = 'post')


posts_router = routers.NestedSimpleRouter(router,
                                            r'post',#parent_router
                                            lookup = 'post')

posts_router.register(r'comment',
                        CommentViewSet,
                        basename = 'post-comment')

urlpatterns = [

    *router.urls,

    *posts_router.urls,

    path(f'change_password/',
            change_password,
            name = 'change_password'),
        
]

