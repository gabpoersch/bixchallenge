from django.urls import path
from . import views

urlpatterns = [
    path('', views.employee_list, name='employee-list'),
    path('<int:pk>', views.employee_detail, name='employee-detail'),

    path('<int:pk>/vacations', views.employee_vacations, name='employee-vacations'),
]
