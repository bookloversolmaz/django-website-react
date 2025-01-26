import os
import environ
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import ContactSerializer
from contact.models import Contact

# Ensure that the environment variables are properly loaded
env = environ.Env()
environ.Env.read_env()  # Make sure this reads your .env file correctly

# Set the DJANGO_SETTINGS_MODULE manually if needed
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()

            subject = f"New Contact Submission from {contact.name}"
            html_content = f"""
            <p>A new contact form has been submitted:</p>
            <ul>
                <li><strong>Name:</strong> {contact.name}</li>
                <li><strong>Email:</strong> {contact.email}</li>
                <li><strong>Subject:</strong> {contact.subject}</li>
                <li><strong>Message:</strong> {contact.message}</li>
            </ul>
            """

            try:
                # Load SENDGRID_API_KEY from .env
                sendgrid_api_key = env('SENDGRID_API_KEY')
                if not sendgrid_api_key:
                    return Response(
                        {"error": "SendGrid API key not found in environment variables."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )

                sg = SendGridAPIClient(sendgrid_api_key)
                message = Mail(
                    from_email=Contact.email,
                    to_emails=settings.DEFAULT_FROM_EMAIL,
                    subject=subject,
                    html_content=html_content,
                )
                response = sg.send(message)

                if response.status_code == 202:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"error": "Failed to send email", "details": response.body.decode()},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
            except Exception as e:
                return Response(
                    {"error": "Failed to send email", "details": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)