from django.contrib import admin
from django.urls import include, path
from employee import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('company/', include('company.urls')),
    path('employee/', include('employee.urls')),
    # path('vacations/', views.vacation_list, name='vacation-list'),
    # path('vacations/<int:pk>', views.vacation_detail, name='vacation-detail'),
]
