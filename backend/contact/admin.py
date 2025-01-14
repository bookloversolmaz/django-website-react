from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')  # Columns to display in the admin list view
    search_fields = ('name', 'email', 'subject')  # Fields to include in the search bar
    list_filter = ('created_at',)  # Filters for the sidebar