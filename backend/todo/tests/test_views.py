from django.test import TestCase
from todo.models import React
from todo.views import ReactView, ReactDetail
from todo.serializer import ReactSerializer
from django.urls import reverse

class ReactView(TestCase):
    def test_get(self):
        url = reverse('todo')
        self.assertEqual(url, '/todo/')

        #         url = reverse('todo', args=['Hoover room'])
        # self.assertEqual(url, '/todo/item='Hoover room'/')
