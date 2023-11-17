# from .models import *
# from .serializer import *
# from rest_framework import generics
# from rest_framework.response import Response
# from rest_framework.views import APIView

# # from rest_framework.views import exception_handler

# class ReactView(generics.ListCreateAPIView):
#     queryset = React.objects.all()
#     serializer_class = ReactSerializer

# class ReactView(APIView):
#     queryset = React.objects.all()
#     serializer_class = ReactSerializer

# # TODO: Add a delete function

#     @api_view(['GET', 'DELETE'])
#     def post_element(request, pk):
#         try:
#             queryset = React.objects.get(pk=pk)
#         except React.DoesNotExist:
#             return Response(status=404)

#         if request.method == 'GET':
#             serializer = React.Serializer(queryset)
#             return Response(serializer.data)

#         elif request.method == 'DELETE':
#             React.delete()
#             return Response(status=204)

from .models import React
from .serializer import ReactSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class ReactView(APIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer

    def get(self, request, pk):
        try:
            react_object = React.objects.get(pk=pk)
            serializer = ReactSerializer(react_object)
            return Response(serializer.data)
        except React.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            react_object = React.objects.get(pk=pk)
            react_object.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except React.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# TODO: Add a feature where restarts the id from one when an entry is deleted.