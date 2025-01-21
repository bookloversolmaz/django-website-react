from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'message', 'created_at')  # Columns to display in the admin list view
    search_fields = ('name', 'email', 'subject', 'created_at')  # Fields to include in the search bar
    list_filter = ('name', 'email', 'subject', 'created_at')  # Filters for the sidebar