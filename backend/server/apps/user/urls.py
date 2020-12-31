from django.urls import path

from . import views


app_name = "user"

urlpatterns = [
    path('login/', views.APILoginView.as_view(), name='api_login'),
    path('logout/', views.APILogoutView.as_view(), name='api_logout'),
    path('update_password/', views.APIPasswordUpdateView.as_view(), name='api_update_password'),
    path("create/", views.CreateUserView.as_view(), name="create"),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('me/', views.ManageUserView.as_view(), name='me'),
]
