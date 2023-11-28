from django.test import TestCase
from todo.models import React

# class ReactTestCase(TestCase):
#     def setUp(self):
#         React.objects.create(item="Eat cheese")
#         React.objects.create(item="Cook food")

#     def test_create_list(self):
#         item_one = React.objects.get(item="Eat cheese")
#         item_two = React.objects.get(item="Cook food")
#         self.assertEqual(item_one.item, "Eat cheese")
#         self.assertEqual(item_two.item, "Cook food")

#     def tearDown(self):
#         pass

class ReactTestCase(TestCase):
    def setUp(self):
        React.objects.create(item="Eat cheese")
        React.objects.create(item="Cook food")

    def test_create_list(self):
        item_one = React.objects.get(item="Eat cheese")
        self.assertEqual(item_one.item, "Eat cheese")

    def tearDown(self):
        # Clean up after the tests
        React.objects.all().delete()