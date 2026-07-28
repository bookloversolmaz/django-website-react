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


import logging

logger = logging.getLogger(__name__)


class PostAdmin(admin.ModelAdmin):
    inlines = [ContentBlockInline]

    def save_formset(self, request, form, formset, change):
        logger.warning("ENTERED SAVE_FORMSET")

        instances = formset.save(commit=False)

        for instance in instances:
            logger.warning("IMAGE BEFORE SAVE: %s", repr(instance.image.name))

            try:
                instance.save()

                logger.warning(
                    "IMAGE AFTER SAVE: %s",
                    repr(instance.image.name)
                )

            except Exception:
                logger.exception("CLOUDINARY SAVE FAILED")
                raise

        formset.save_m2m()

def save_formset(self, request, form, formset, change):
    print("ENTERED SAVE_FORMSET")

    try:
        instances = formset.save(commit=False)
        print("FORMSET SAVED")

        for instance in instances:
            print("INSTANCE:", instance)
            print("IMAGE:", repr(instance.image.name))

            instance.save()

            print("SAVED OK")
            print("IMAGE AFTER:", repr(instance.image.name))

        formset.save_m2m()

    except Exception:
        import traceback
        print("========== ERROR ==========")
        traceback.print_exc()
        print("============================")
        raise