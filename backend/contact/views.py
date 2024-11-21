from django.shortcuts import render
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def send_contact_email(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Compose email
        subject = f"New Contact Form Submission from {name}"
        email_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

        # Send email to your personal email address
        send_mail(
            subject,
            email_message,
            'yourwebsite@example.com',  # Replace with your sender email (must be registered in settings)
            ['yourpersonalemail@example.com'],  # Replace with your personal email address
        )

        return JsonResponse({"message": "Email sent successfully!"}, status=200)

    return JsonResponse({"error": "Invalid request"}, status=400)
