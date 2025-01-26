# import os
# import environ
# from sendgrid import SendGridAPIClient
# from sendgrid.helpers.mail import Mail
# from django.conf import settings
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializer import ContactSerializer
# from contact.models import Contact

# # Ensure that the environment variables are properly loaded
# env = environ.Env()
# environ.Env.read_env()  # Make sure this reads your .env file correctly

# # Set the DJANGO_SETTINGS_MODULE manually if needed
# os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

# class ContactView(APIView):
#     def post(self, request):
#         serializer = ContactSerializer(data=request.data)
#         if serializer.is_valid():
#             # The contact variable below takes the data from serializer, which is the user input
#             contact = serializer.save()

#             subject=f"New Contact Submission from {contact.name}"
#             html_content=f"""
#             <p>A new contact form has been submitted:</p>
#             <ul>
#                 <li><strong>Name:</strong> {contact.name}</li>
#                 <li><strong>Email:</strong> {contact.email}</li>
#                 <li><strong>Subject:</strong> {contact.subject}</li>
#                 <li><strong>Message:</strong> {contact.message}</li>
#             </ul>
#             """
#             try:
#                 sendgrid_api_key = env('SENDGRID_API_KEY')
#                 sg = SendGridAPIClient(sendgrid_api_key)
#                 message = Mail(
#                 from_email=settings.DEFAULT_FROM_EMAIL,  # Use verified email
#                 to_emails=settings.DEFAULT_FROM_EMAIL,  # Your email to receive the contact form
#                 # contact here is an instance of serializer, which uses data inputted by the user. Hence, why it does not need to import 
#                 # from models
#                 subject=f"New Contact Submission from {contact.name}",
#                 html_content=f"""
#                 <p>A new contact form has been submitted:</p>
#                 <ul>
#                     <li><strong>Name:</strong> {contact.name}</li>
#                     <li><strong>Email:</strong> {contact.email}</li>
#                     <li><strong>Subject:</strong> {contact.subject}</li>
#                     <li><strong>Message:</strong> {contact.message}</li>
#                 </ul>
#                 <p><strong>Reply to:</strong> {contact.email}</p>
#                 """
#                 )
#                 response = sg.send(message)
#                 if response.status_code == 202:
#                     return Response(serializer.data, status=status.HTTP_201_CREATED)
#                 else:
#                     return Response(
#                         {"error": "Failed to send email", "details": response.body.decode()},
#                         status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                     )
#             except Exception as e:
#                 return Response(
#                 {"error": "Failed to send email", "details": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 )

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
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
                email = EmailMultiAlternatives(
                    subject=subject,
                    body=text_content,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[settings.DEFAULT_FROM_EMAIL], 
                    reply_to=[contact.email]
                )
                email.attach_alternative(html_content, "text/html")
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