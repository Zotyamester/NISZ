from django.db.models import base
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'groups', views.GroupViewSet, basename='group')
router.register(r'events', views.EventViewSet, basename='event')

app_name = 'groups'
urlpatterns = [
    re_path(r'^groups/(?:.*)/?$', TemplateView.as_view(template_name='groups/index.html'), name='group-base'),
    path('api/', include(router.urls)),
]
