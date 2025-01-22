from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from .models import Contact
from .serializer import ContactSerializer
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
import logging

logger = logging.getLogger(__name__)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class ContactView(APIView):
    def get(self, request):
        # List all contact messages
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            
            # Email notification logic
            try:
                subject = f"New Contact Submission from {contact.name}"
                text_content = f"""
                A new contact form has been submitted:

                Name: {contact.name}
                Email: {contact.email}
                Subject: {contact.subject}
                Message: {contact.message}
                """
                html_content = f"""
                <p>A new contact form has been submitted:</p>
                <ul>
                    <li><strong>Name:</strong> {contact.name}</li>
                    <li><strong>Email:</strong> {contact.email}</li>
                    <li><strong>Subject:</strong> {contact.subject}</li>
                    <p><strong>Message:</strong> {contact.message}</p>
                </ul>
                """
                # Send email with a verified "from" address
                email = send_mail(
                    subject=subject,
                    message=text_content,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    reply_to=[contact.email]
                )
                email.send()
                logger.info(f"Contact email sent successfully for {contact.name} ({contact.email}).")
            except Exception as e:
                logger.error(f"Failed to send contact email for {contact.name} ({contact.email}): {e}")
                return Response(
                    {"error": "Failed to send email", "details": str(e)}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
