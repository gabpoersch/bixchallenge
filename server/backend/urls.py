from django.contrib import admin
from django.urls import include, path
from employee import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('company/', include('company.urls')),
    path('employee/', include('employee.urls')),
    path('auth/', include('user_auth.urls')),
    path('vacations/', views.list_or_create_vacations, name='vacation-list'),
    path('vacations/<int:pk>', views.get_update_or_delete_vacation_by_id, name='vacation-detail'),
    path('timeline/', views.list_timeline, name='employee-timeline'),
    path('timeline/<int:employee_id>/', views.get_employee_timeline, name='employee_detail_timeline'),
]
