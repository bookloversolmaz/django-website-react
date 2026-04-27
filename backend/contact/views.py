import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializer import ContactSerializer

logger = logging.getLogger(__name__)


class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        contact = serializer.save()

        subject = f"New Contact Submission from {contact.name}"

        text_content = f"""
A new contact form has been submitted:

Name: {contact.name}
Email: {contact.email}
Subject: {contact.subject}

Message:
{contact.message}
"""

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
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.CONTACT_TO_EMAIL],
                reply_to=[contact.email],
            )

            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=False)

        except Exception as error:
            logger.exception("Contact message was saved, but email sending failed.")

            # Important: return success because the message is saved in Django admin
            return Response(
                {
                    "message": "Contact message saved successfully, but email notification failed.",
                    "email_error": str(error),
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)