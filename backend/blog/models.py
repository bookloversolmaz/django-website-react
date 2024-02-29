from django.db import models

class Blog(models.Modelodel):
    title = models.CharField(max_length = 30)
    description = models.TextField()
    def __str__(self):
        return self.item