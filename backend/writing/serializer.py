# Serializers used to convert complex data to native Python data type that are then rendered into Json which is used
# in React on the client-side (frontend)

from rest_framework import serializers
from .models import Post, ContentBlock


class ContentBlockSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ContentBlock
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get("request")

        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url

        return None


class PostSerializer(serializers.ModelSerializer):
    blocks = ContentBlockSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Post
        fields = "__all__"