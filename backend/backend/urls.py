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

# from django.contrib import admin
# from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns
# from todo import views as todo_views
# from home import views as home_views
# from writing import views as writing_views
# from projects import views as project_views
# from contact import views as contact_views
# from django.views.generic import TemplateView

# urlpatterns = [
#     path('', TemplateView.as_view(template_name="frontend/build/index.html")),
#     path('admin/', admin.site.urls),
#     path('', home_views.HomeView.as_view(), name='home'),
#     path('todo/', todo_views.TodoListView.as_view(), name='todo'),
#     path('todo/<int:pk>/', todo_views.TodoListView.as_view(), name='todo-delete'),  # Handle GET requests for listing todos
#     path('todo/<int:pk>/', todo_views.TodoDetailView.as_view()),  # Handle DELETE requests for a specific todo
#     path('writing/', writing_views.WritingListView.as_view()),
#     path('writing/<int:pk>/', writing_views.WritingEntireView.as_view(), name='writing_detail'),
#     path('projects/', project_views.ProjectListView.as_view(), name='project-list'),
#     path('contact/', contact_views.ContactView.as_view(), name='contact-list'),  # For GET and POST
#     path('contact/<int:message_id>/', contact_views.ContactView.as_view(), name='delete-contact'),  # For DELETE
#     ]

# urlpatterns = format_suffix_patterns(urlpatterns)

from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from todo import views as todo_views
from home import views as home_views
from writing import views as writing_views
from projects import views as project_views
from contact import views as contact_views
from django.views.generic import TemplateView

urlpatterns = [
    # Serve the React frontend (index.html) at the root URL
    path('', TemplateView.as_view(template_name="frontend/build/index.html"), name='home'),

    # Admin URL
    path('admin/', admin.site.urls),

    # Other API or views
    path('todo/', todo_views.TodoListView.as_view(), name='todo'),
    path('todo/<int:pk>/', todo_views.TodoDetailView.as_view(), name='todo-detail'),  # Corrected name
    path('writing/', writing_views.WritingListView.as_view(), name='writing-list'),
    path('writing/<int:pk>/', writing_views.WritingEntireView.as_view(), name='writing-detail'),
    path('projects/', project_views.ProjectListView.as_view(), name='project-list'),
    path('contact/', contact_views.ContactView.as_view(), name='contact-list'),
    path('contact/<int:message_id>/', contact_views.ContactView.as_view(), name='delete-contact'),
]

# Apply format suffix patterns (for REST API responses like `.json`, `.html`, etc.)
urlpatterns = format_suffix_patterns(urlpatterns)
