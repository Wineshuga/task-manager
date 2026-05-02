from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from projects.views import ProjectViewSet, TaskViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import RegisterView, MeView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('', include('django_prometheus.urls')),
    path('admin/', admin.site.urls),
    path('api/auth/login/', TokenObtainPairView.as_view()),
    path("api/auth/register/", RegisterView.as_view()),
    path('api/auth/refresh/', TokenRefreshView.as_view()),
    path('api/auth/me/', MeView.as_view()),
    path(
        'api/projects/<uuid:project_id>/tasks/',
        TaskViewSet.as_view({
            'get': 'list',
            'post': 'create'
        }),
    ),
    path(
        'api/projects/<uuid:project_id>/tasks/<uuid:pk>/',
        TaskViewSet.as_view({
            'patch': 'partial_update',
            'put': 'update',
            'delete': 'destroy',
            'get': 'retrieve'
        }),
    ),
    path('api/', include(router.urls)),
]
