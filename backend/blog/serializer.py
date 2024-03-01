# Serializers used to convert complex data to native Python data type that are then rendered into Json which is used
# in React on the client-side (frontend)

from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('id', 'title', 'publication_date', 'description', 'body_text')
        fields = '__all__'