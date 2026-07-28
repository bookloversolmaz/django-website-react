# from django.contrib import admin
# from .models import Post, ContentBlock


# class ContentBlockInline(admin.StackedInline):
#     model = ContentBlock
#     extra = 1
#     fields = (
#         "block_type",
#         "heading",
#         "body",
#         "image",
#         "caption",
#         "order",
#     )


# @admin.register(Post)
# class PostAdmin(admin.ModelAdmin):
#     inlines = [ContentBlockInline]

from django.contrib import admin
from .models import Post, ContentBlock


class ContentBlockInline(admin.StackedInline):
    model = ContentBlock
    extra = 1


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [ContentBlockInline]

    def save_formset(self, request, form, formset, change):
        print("REQUEST FILES:")
        print(request.FILES)

        instances = formset.save(commit=False)

        for instance in instances:
            print("IMAGE NAME BEFORE SAVE:")
            print(repr(instance.image.name))
            instance.save()
            print("IMAGE NAME AFTER SAVE:")
            print(repr(instance.image.name))

        formset.save_m2m()