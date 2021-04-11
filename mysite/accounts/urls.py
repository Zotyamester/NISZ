from django.urls import path
from django.contrib.auth import views as auth_views
from . import views as accounts_views

urlpatterns = [
    path('profile/', accounts_views.profile, name='profile'),
    path('register/', accounts_views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(redirect_authenticated_user=True), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('password-reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password-reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('groups/', accounts_views.GroupListView.as_view(), name='group-list'),
    path('group/<str:name>/', accounts_views.GroupDetailView.as_view(), name='group-detail'),
    path('group/<str:name>/new', accounts_views.GroupDetailView.as_view(), name='group-detail'),
    path('group/<str:name>/update', accounts_views.GroupUpdateView.as_view(), name='group-update'),
    path('group/<str:name>/delete', accounts_views.GroupDeleteView.as_view(), name='group-delete'),
]
