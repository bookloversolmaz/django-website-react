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

            try:
                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                message = Mail(
                from_email='from_email@example.com',
                to_emails=contact.email,
                subject=contact.subject,
                html_content=contact.message,
                )
                response = sg.send(message)
                if response.status_code == 202:
                    logger.info(f"Contact email sent successfully for {contact.name} ({contact.email}).")
                else:
                    logger.error(f"Failed to send contact email for {contact.name} ({contact.email}): {response.body}")
                return Response(
                {"error": "Failed to send email", "details": response.body.decode()},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,)


            except Exception as e:
                logger.error(f"Error sending contact email for {contact.name} ({contact.email}): {str(e)}")
                return Response(
                {"error": "Failed to send email", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                logger.error(
                    f"Error sending contact email for {contact.name} ({contact.email}): {str(e)}")
                return Response(
                    {"error": "Failed to send email", "details": str(e)},
                    status = status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Invalid data submitted: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

