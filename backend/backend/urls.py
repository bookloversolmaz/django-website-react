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
from django.urls import path, re_path
from rest_framework.urlpatterns import format_suffix_patterns
from todo.views import TodoDetailView, TodoListView
from writing.views import WritingEntireView, WritingListView
from projects.views import ProjectListView
from contact.views import ContactView
from django.views.generic import TemplateView

urlpatterns = [
    # Admin URL (ensure this is prioritized)
    path('admin/', admin.site.urls),
    path('todo/', TodoListView.as_view(), name='todo'),
    path('todo/<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),
    path('writing/', WritingListView.as_view(), name='writing-list'),
    path('writing/<int:pk>/', WritingEntireView.as_view(), name='writing-detail'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('contact/', ContactView.as_view(), name='contact-list'),
    path('contact/<int:message_id>/', ContactView.as_view(), name='delete-contact'),

    # Catch-all route for React frontend
    # This serves the React `index.html` for any unmatched routes.
    re_path(r'^(?!admin/).*$', TemplateView.as_view(template_name="index.html")),
]
# Apply format suffix patterns (for REST API responses like `.json`, `.html`, etc.)
urlpatterns = format_suffix_patterns(urlpatterns)
