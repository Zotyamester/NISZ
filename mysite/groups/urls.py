from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'groups', views.GroupViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'events', views.EventViewSet)

app_name = 'groups'
urlpatterns = [
    path('groups/', views.group_base, name='group-base'),
    path('api/', include(router.urls)),
]
