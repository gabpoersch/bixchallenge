from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_or_create_employees, name='employee-list'),
    path('<int:pk>/', views.get_update_or_delete_employee, name='employee-detail'),

    path('<int:pk>/vacations/', views.get_employee_vacations, name='employee-vacations'),

]
