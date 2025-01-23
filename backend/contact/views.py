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

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class ContactView(APIView):
    def get(self, request):
        # List all contact messages
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
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

                # Send email using SendGrid API
                message = Mail(
                    from_email=settings.DEFAULT_FROM_EMAIL,  # Verified sender in SendGrid
                    to_emails='recipient@example.com',  # Replace with the recipient's email
                    subject=subject,
                    plain_text_content=text_content,
                    html_content=html_content,
                )

                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)  # API key stored in settings
                response = sg.send(message)

                # Log the response for debugging
                logger.info(f"SendGrid response status: {response.status_code}")
                logger.info(f"SendGrid response body: {response.body}")
                logger.info(f"SendGrid response headers: {response.headers}")

                if response.status_code == 202:
                    logger.info(f"Contact email sent successfully for {contact.name} ({contact.email}).")
                else:
                    logger.error(f"Failed to send contact email for {contact.name} ({contact.email}).")
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

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Invalid data submitted: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

