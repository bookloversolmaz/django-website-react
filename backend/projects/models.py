from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=255)
    thumbnail = models.URLField()  # URL to the thumbnail image
    github_url = models.URLField()  # URL to the GitHub repository

    def __str__(self):
        return self.name
