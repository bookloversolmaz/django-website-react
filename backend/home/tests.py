from django.test import TestCase
# from django.urls import reverse
# from django.shortcuts import get_object_or_404
# from rest_framework.test import APITestCase
# from rest_framework import status
# from views import HomeView

class HomeViewTestCase(TestCase):
    def test_get(self):
        response = self.client.get('', follow=True)
        self.assertEqual(response.status_code, 200)