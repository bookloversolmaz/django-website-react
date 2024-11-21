from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=255, unique=True) # Ensures that each project has a unique name in the database.
    image = models.URLField()  # URL to the thumbnail image
    description = models.CharField(default='No description provided.', max_length=255)
    github_url = models.URLField()  # URL to the GitHub repository

    def __str__(self):
        return self.name
