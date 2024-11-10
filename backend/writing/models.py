from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    publication_date = models.DateTimeField(null=True, blank=True) # Manually controlled publication date
    created_on = models.DateTimeField(null=True, blank=True) # Manually controlled publication date
    updated_on = models.DateTimeField(auto_now=True)  # Updated on each save
    def __str__(self):
        return self.title
