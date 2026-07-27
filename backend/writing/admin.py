from django.contrib import admin
from .models import Post, Section


class SectionInline(admin.StackedInline):
    model = Section
    extra = 1


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [SectionInline]