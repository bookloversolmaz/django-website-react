from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response

class ReactView(APIView):

    # def get(self, request):
        # output = [{"item": Item.item_text,
        #            "description": Description.description_text}]
        # serializer = ReactSerializer(data=request.data)  # Serialize the queryset
        # if serializer.is_valid(raise_exception=True):
        #     serializer.save()
        #     return render(serializer.data)
        
    def get(self, request):
        # Query the database for items and descriptions
        items = Item.objects.all()
        descriptions = Description.objects.all()

        # Combine items and descriptions into a list (correct)
        result = list(items) + list(descriptions)
        return result

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)  # Return a successful JSON response
        return Response(serializer.errors, status=400)  # Return validation errors as a JSON response

    # def get(self, request):
    #     output = [{"item": output.item,
    #                "description": output.description}]
    #     return render(request, )
    
    # def post(self, request):
    #     serializer = ReactSerializer(data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return render(serializer.data)
