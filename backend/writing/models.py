from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)

    publication_date = models.DateField(
        null=True,
        blank=True
    )

    created_on = models.DateField(
        null=True,
        blank=True
    )

    class Meta:
        ordering = ["-created_on"]

    def __str__(self):
        return self.title


class ContentBlock(models.Model):

    BLOCK_TYPES = [
        ("text", "Text"),
        ("image", "Image"),
    ]

    post = models.ForeignKey(
        Post,
        related_name="blocks",
        on_delete=models.CASCADE
    )

    block_type = models.CharField(
        max_length=20,
        choices=BLOCK_TYPES,
        default="text"
    )

    heading = models.CharField(
        max_length=255,
        blank=True
    )

    body = models.TextField(
        blank=True
    )

    image = models.ImageField(
        upload_to="post_images/",
        blank=True,
        null=True
    )

    caption = models.CharField(
        max_length=255,
        blank=True
    )

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]