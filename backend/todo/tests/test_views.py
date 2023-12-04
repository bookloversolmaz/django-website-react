from django.test import TestCase
from ..models import React
from ..views import ReactView, ReactDetail
from todo.serializer import ReactSerializer
from django.urls import reverse, include, path
from django.shortcuts import get_object_or_404
from rest_framework.test import APITestCase
from rest_framework import status

class ReactViewTestCase(APITestCase):
    def setUp(self):
        # Create test data
        self.react = React.objects.create(item='Test item')

    def test_get_all_items(self):
        url = reverse('todo')  
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    
    # def test_post(request, pk):
    #     # View function after adding an item to the to do list
    #     item_instance = get_object_or_404(ItemInstance, pk=pk)
    #     # If this is a POST request then process the Form data
    #     if request.method == 'POST':
    #         # Create a form instance and populate it with data from the request (binding):
    #         todo_list = ReactSerializer(request.POST)
    #         # Check if the form is valid:
    #         if form.is_valid():
    #         # process the data in form.cleaned_data as required (here we just write it to the model due_back field)
    #             item_instance = form.cleaned_data['Hoover room']
    #             item_instance.save()

    #         # redirect to a new URL:
    #         return HttpResponseRedirect(reverse('Hoover room'))



