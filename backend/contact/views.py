from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Contact
from .serializer import ContactSerializer
import logging

logger = logging.getLogger(__name__)

class ContactView(APIView):
    def get(self, request):
        # List all contact messages
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)