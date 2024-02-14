from todo.models import React
from todo.serializer import ReactSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404

# CRUD: create, read, update, delete

class TodoListView(APIView):
    # List items or create a new item
    serializer_class = ReactSerializer

    def get(self, request):
        list_item = React.objects.all()
        serializer = ReactSerializer(list_item, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        instance = get_object_or_404(React, pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Create instance view, retrieve, update or delete an item instance.

class TodoDetailView(APIView):

    def get_object(self, pk):
        try:
            return React.objects.get(pk=pk)
        except React.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, pk, format=None):
        list_item = self.get_object(pk)
        serializer = ReactSerializer(list_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        list_item = self.get_object(pk)
        serializer = ReactSerializer(list_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        list_item = self.get_object(pk)
        list_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)