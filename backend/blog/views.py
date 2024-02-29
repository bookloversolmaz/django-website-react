from django.shortcuts import render
from .models import Blog
from .serializer import BlogSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

# queryset this to select data from database, you can select all data or apply filter or what you want, in more basic way. Where to write your database query using Django ORM

class BlogView(APIView):
    serializer_class = BlogSerializer

    def get(self, request):
        queryset = Blog.objects.all()
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data)