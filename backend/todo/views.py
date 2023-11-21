# from .models import React
# from .serializer import ReactSerializer
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status, permissions, generics
# from django.shortcuts import get_object_or_404

# # (generics.ListCreateAPIView):

# # CRUD: create, read, update, delete
# # Read

# class ReactView(generics.RetrieveDestroyAPIView):
#     queryset = React.objects.all()
#     serializer_class = ReactSerializer

#     def post(self, request):
#         serializer = ReactSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id):
#         instance = get_object_or_404(React, id=id)
#         instance.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import React
from .serializer import ReactSerializer

class ReactListView(generics.ListAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer
    lookup_url_kwarg = 'id'  # Specify the URL parameter name for the object ID

class ReactDeleteView(generics.DestroyAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer
    lookup_url_kwarg = 'id'  # Specify the URL parameter name for the object ID

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()  # Get the object based on the provided ID
        self.perform_destroy(instance)  # Perform object deletion
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return success response
