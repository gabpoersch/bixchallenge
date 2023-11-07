from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_or_create_companies),
    path('<int:pk>/', views.get_update_or_delete_company),
]
