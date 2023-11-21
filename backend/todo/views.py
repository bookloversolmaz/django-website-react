from .models import React
from .serializer import ReactSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, generics
from django.shortcuts import get_object_or_404

# (generics.ListCreateAPIView):
# CRUD: create, read, update, delete
# Read
class ReactView(generics.ListCreateAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer

    def delete(self, request, id):
        instance = get_object_or_404(React, id=id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request):
        request = [{"item": request.item}
                  for request in React.objects.all()]
        return Response(request)

    # def post(self, request):
    #     serializer = ReactSerializer(data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        instance = get_object_or_404(React, id=id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)