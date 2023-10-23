from django.db import models

# Create your models here.
class Item(models.Model):
    item_text = models.CharField(max_length=30)
    def __str__(self):
        return self.item_text

class Description(models.Model):
    description_text = models.CharField(max_length=200)
    def __str__(self):
        return self.description_text