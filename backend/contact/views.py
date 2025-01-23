from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings
from .models import Contact
from .serializer import ContactSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import logging
import os

# Initialize logger
logger = logging.getLogger(__name__)

# Fetch the API key from the environment variables
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")
if not SENDGRID_API_KEY:
    raise ValueError("SENDGRID_API_KEY is not set in the environment variables.")

# Initialize SendGrid client
sg = SendGridAPIClient(SENDGRID_API_KEY)

@method_decorator(csrf_exempt, name='dispatch')
class ContactView(APIView):
    def get(self, request):
        """
        Handles GET requests: List all contact messages.
        """
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Handles POST requests: Save a contact message and send email notification.
        """
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()

            try:
                # Email content
                subject = f"New Contact Submission from {contact.name}"
                html_content = f"""
                <p>A new contact form has been submitted:</p>
                <ul>
                    <li><strong>Name:</strong> {contact.name}</li>
                    <li><strong>Email:</strong> {contact.email}</li>
                    <li><strong>Subject:</strong> {contact.subject}</li>
                    <p><strong>Message:</strong> {contact.message}</p>
                </ul>
                """

                # Check DEFAULT_FROM_EMAIL in settings
                from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', None)
                if not from_email:
                    logger.error("DEFAULT_FROM_EMAIL is not set in settings.")
                    return Response(
                        {"error": "Email configuration error", "details": "DEFAULT_FROM_EMAIL is not set in settings."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )

                # Create the email message
                message = Mail(
                    from_email=from_email,
                    to_emails='recipient@example.com',  # Replace with the recipient's email
                    subject=subject,
                    html_content=html_content,
                )

                # Send the email
                response = sg.send(message)

                # Handle response
                if response.status_code == 202:
                    logger.info(f"Contact email sent successfully for {contact.name} ({contact.email}).")
                else:
                    logger.error(f"Failed to send contact email for {contact.name} ({contact.email}): {response.body}")
                    return Response(
                        {"error": "Failed to send email", "details": response.body.decode()},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
            except Exception as e:
                logger.error(f"Error sending contact email for {contact.name} ({contact.email}): {str(e)}")
                return Response(
                    {"error": "Failed to send email", "details": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            # Return the saved contact data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Invalid data submitted: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
