import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import ContactSerializer
from .models import Contact

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
                sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
                if not sendgrid_api_key:
                    return Response(
                        {"error": "SendGrid API key not found in environment variables."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )

                sg = SendGridAPIClient(sendgrid_api_key)
                message = Mail(
                    from_email=settings.DEFAULT_FROM_EMAIL,  # From settings or .env
                    to_emails=contact.email,  # The recipient email
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
