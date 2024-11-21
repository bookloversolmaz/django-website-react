from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from contact.models import Contact
from contact.serializer import ContactSerializer
from rest_framework.views import APIView

class ContactView(APIView):
    def get(self, request):
        # List all contact messages
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Create a new contact message
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

