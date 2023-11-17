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
from django.urls import path, include, re_path
from app.views import ReactView


urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('app/', ReactView.as_view(), name='todo-list'),
    # path('app/<int:pk>/', ReactView.as_view(), name='todo_detail'),
    # # The following pattern might represent the deletion endpoint for a specific React object.
    # path('app/delete/<int:pk>/', ReactView.as_view(), name='todo-delete'),  # Example: '/app/delete/1/' for deletion

    path('admin/', admin.site.urls),
    path('app/', include('/app')),
    path(' ', ReactView.as_view(url='app/')),  # Redirect root URL to '/app/' or any desired URL
]


