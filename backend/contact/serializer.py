from rest_framework import serializers
from contact.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']

        def validate_email(self, value):
            if not value.endswith('@example.com'):
                raise serializers.ValidationError("Only @example.com emails are allowed.")
            return value