# from .models import React
# from .serializer import ReactSerializer
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status
# from django.shortcuts import get_object_or_404

# # CRUD: create, read, update, delete

# class ReactView(APIView):
#     # List items or create a new item
#     serializer_class = ReactSerializer

#     def get(self, request):
#         list_item = React.objects.all()
#         serializer = ReactSerializer(list_item, many=True)
#         return Response(serializer.data)
