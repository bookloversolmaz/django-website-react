from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    publication_date = models.DateField(null=True, blank=True) # Manually controlled publication date
    created_on = models.DateField(null=True, blank=True) # Manually controlled publication date
    def __str__(self):
        return self.title
