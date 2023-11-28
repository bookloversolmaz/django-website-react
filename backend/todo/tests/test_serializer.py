from django.test import TestCase
from django.core.serializers import serialize
from todo.models import React

# In Django, the serialize() function from django.core.serializers is used to convert model instances into serialized data in various formats such as JSON

class ReactSerializerTestCase(TestCase):
    def test_serializer(self):
        # Create a React object
        react = React.objects.create(item='Eat food')

        # Do the serialization in json format. [react] is a list containing the Django model instances (in this case, a single instance of the React model)
        actual_json = serialize('json', [react])

        # Construct the expected JSON string
        expected_json = f'[{{"model": "todo.react", "pk": {react.pk}, "fields": {{"item": "Eat food"}}}}]'

        # Did it work?
        self.assertEqual(actual_json, expected_json)