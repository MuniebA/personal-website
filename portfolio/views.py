from django.shortcuts import render
from .models import Project


def home(request):
    return render(request, 'home.html')


def ai_projects(request):
    projects = Project.objects.filter(category='AI')
    return render(request, 'ai_projects.html', {'projects': projects})


def software_dev(request):
    projects = Project.objects.filter(category='SW')
    return render(request, 'software_dev.html', {'projects': projects})
