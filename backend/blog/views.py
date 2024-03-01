from django.shortcuts import render
from .models import Blog
from .serializer import BlogSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404

# queryset this to select data from database, you can select all data or apply filter or what you want, in more basic way. Where to write your database query using Django ORM

class BlogView(APIView):
    serializer_class = BlogSerializer

    def get(self, request):
        queryset = Blog.objects.all()
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        instance = get_object_or_404(Blog, pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Create instance view, retrieve, update or delete an item instance.
class BlogDetailView(APIView):
    def get_object(self, pk):
        try:
            return Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, pk, format=None):
        queryset = self.get_object(pk)
        serializer = BlogSerializer(queryset)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        list_item = self.get_object(pk)
        serializer = BlogSerializer(list_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)