# Serializers used to convert complex data to native Python data type that are then rendered into Json which is used
# in React on the client-side (frontend)

from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'publication_date', 'created_on', 'body']
