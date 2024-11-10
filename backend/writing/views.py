from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from writing.models import Post
from writing.serializer import PostSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class WritingListView(APIView):
    # List items or create a new item
    serializer_class = PostSerializer

    # Display a list of all the posts
    def get(self, request):
        posts = Post.objects.all().order_by("publication_date")  # Get all posts
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class WritingEntireView(APIView):
    # Display the full post
    def get(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)  # Retrieve the post by primary key
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)