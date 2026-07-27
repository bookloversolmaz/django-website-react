# Serializers used to convert complex data to native Python data type that are then rendered into Json which is used
# in React on the client-side (frontend)

from rest_framework import serializers
from .models import Section, Post

class SectionSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get("request")

        if obj.image:
            return request.build_absolute_uri(obj.image.url)

        return None


class PostSerializer(serializers.ModelSerializer):

    sections = SectionSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Post
        fields = "__all__"