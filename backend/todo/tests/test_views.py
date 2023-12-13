from django.test import TestCase
from ..models import React
from ..views import ReactView, ReactDetail
from todo.serializer import ReactSerializer
from django.urls import reverse
from django.shortcuts import get_object_or_404
from rest_framework.test import APITestCase
from rest_framework import status

class ReactViewTestCase(APITestCase):
    def setUp(self):
        # Create test data
        self.react = React.objects.create(item='Test item')

    def test_get(self):
        url = reverse('todo')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_post(self):
        # posting data to create a new item using ReactView
        data = {'item': 'New Test Item'}
        url = reverse('todo')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_delete(self):
        # # Creates mock objects
        item_to_delete = React.objects.create(item='Item to Delete')

        # Get the URL for the ReactDetail view for the specific instance
        url = reverse('todo-delete', kwargs={'pk': item_to_delete.pk})

        # Send a DELETE request to the specified URL
        response = self.client.delete(url)

        # Check if the response status code is 204 (No Content) upon successful deletion
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Check if the instance has been deleted from the database
        # self.assertFalse(React.objects.filter(pk=item_to_delete.pk).exists())