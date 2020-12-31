from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


routers = DefaultRouter()

routers.register('tags', views.TagViewSet)
routers.register('comments', views.CommentViewSet)
routers.register('movies', views.MovieViewSet)
routers.register('movieimages', views.MovieImageViewSet)
routers.register('pttcomments', views.PttCommentViewSet)
routers.register('countgandb', views.CountGoodAndBadViewSet)

app_name = 'movie'

urlpatterns = [
    path('', include(routers.urls))
]
