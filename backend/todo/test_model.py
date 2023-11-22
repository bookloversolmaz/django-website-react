from django.test import TestCase
from todo.models import React

class ReactTestCase(TestCase):
    React.objects.create(item="Eat cheese")
    React.objects.create(item="Cook food")
