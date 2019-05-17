from django.conf.urls import include,url
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'v1', views.TodoItemViewSet, base_name='TodoItem')

urlpatterns = [
    url(r'^', include(router.urls))
]