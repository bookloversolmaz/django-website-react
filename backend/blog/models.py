from django.db import models

class Blog(models.Modelodel):
    title = models.CharField(max_length = 30)
    publication_date = models.DateField()
    description = models.TextField()
    body_text = models.TextField()
    def __str__(self):
        return self.title
    
# The __str__() method is called whenever you call str() on an object.