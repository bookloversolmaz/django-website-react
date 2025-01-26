from rest_framework import serializers
from contact.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']

    def validate_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value