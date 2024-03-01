from django.test import TestCase


class HomeViewTestCase(TestCase):
    def test_get(self):
        response = self.client.get('', follow=True)
        self.assertEqual(response.status_code, 200)