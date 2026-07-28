from django.contrib import admin
from .models import Post, ContentBlock


class ContentBlockInline(admin.StackedInline):
    model = ContentBlock
    extra = 1
    fields = (
        "block_type",
        "heading",
        "body",
        "image",
        "caption",
        "order",
    )


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [ContentBlockInline]