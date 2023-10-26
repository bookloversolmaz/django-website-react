# from django.shortcuts import render
# from rest_framework.views import APIView
# from .models import *
# from .serializer import *
# from rest_framework.response import Response

# class ReactView(APIView):
#     def get(self, request):
#         output = [{"item": output.item,
#                    "description": output.description}
#                 for output in React.objects.all()]
#         return Response(output)
    
#     def post(self, request):
#         serializer = ReactSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data, status=200)
#         else:
#             return Response.status_code(500)

from .models import *
from .serializer import *
from django.shortcuts import render
from rest_framework import generics

class ReactView(generics.ListCreateAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer