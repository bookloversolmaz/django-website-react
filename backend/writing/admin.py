from django.contrib import admin
from .models import Post, ContentBlock


class ContentBlockInline(admin.StackedInline):
    model = ContentBlock
    extra = 1


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [ContentBlockInline]