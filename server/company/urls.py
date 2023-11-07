from django.urls import path
from . import views

urlpatterns = [
    path('', views.company_list),
    path('<int:pk>', views.company_detail),
]
