from django.contrib import admin
from .models import Blog

# Enables the superuser to login to admin of the site and add blogs
admin.site.register(Blog)

# Register your models here.

