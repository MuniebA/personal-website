from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('ai-projects/', views.ai_projects, name='ai_projects'),
    path('software-dev/', views.software_dev, name='software_dev'),
]
