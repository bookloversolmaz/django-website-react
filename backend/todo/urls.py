from django.urls import path
from .views import ReactView  # Import your view

urlpatterns = [
    path('todo/', ReactView.as_view(), name='todo'),  # Ensure a view is associated
    # Other URL patterns
]