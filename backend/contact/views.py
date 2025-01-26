import environ
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import ContactSerializer

# Ensure that the environment variables are properly loaded
env = environ.Env()
environ.Env.read_env()

class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            # Save the contact form data
            contact = serializer.save()

            # Email subject and content
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
                # Load the SendGrid API key
                sendgrid_api_key = env('SENDGRID_API_KEY')
                if not sendgrid_api_key:
                    return Response(
                        {"error": "SendGrid API key not found in environment variables."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )

                # Create the email
                message = Mail(
                    from_email=env('DEFAULT_FROM_EMAIL'),  # Use a verified email address
                    to_emails=env('DEFAULT_FROM_EMAIL'),  # Replace with recipient email
                    subject=subject,
                    html_content=html_content,
                )

                # Send the email
                sg = SendGridAPIClient(sendgrid_api_key)
                response = sg.send(message)

                # Log response for debugging
                print(f"SendGrid Response Status: {response.status_code}")
                print(f"Response Body: {response.body}")
                print(f"Response Headers: {response.headers}")

                # Check the response status
                if response.status_code == 202:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"error": "Failed to send email", "details": response.body.decode()},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
            except Exception as e:
                return Response(
                    {"error": "An error occurred while sending the email", "details": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
