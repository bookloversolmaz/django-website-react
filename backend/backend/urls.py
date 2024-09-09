"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from todo import views as todo_views
from home import views as home_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_views.HomeView.as_view(), name='home'),
    path('todo/', todo_views.TodoListView.as_view(), name='todo'),
    path('todo/<int:pk>/', todo_views.TodoListView.as_view(), name='todo-delete'),  # Handle GET requests for listing todos
    path('todo/<int:pk>/', todo_views.TodoDetailView.as_view()),  # Handle DELETE requests for a specific todo
]

urlpatterns = format_suffix_patterns(urlpatterns)