from .models import React
from .serializer import ReactSerializer
from rest_framework.response import Response
from rest_framework.views import APIView, View
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404

# CRUD: create, read, update, delete
# Read
class ReactView(View):
    queryset = React.objects.all()
    serializer_class = ReactSerializer
    
    permission_classes = [permissions.AllowAny]

# Update/create
def post(self, request, *args, **kwargs):
    serializer = ReactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete
def delete(request, id):
    data = get_object_or_404(id=id) 
    data.delete()
    return Response(request)

# TODO: Add a feature that restarts the id from one when an entry is deleted.
