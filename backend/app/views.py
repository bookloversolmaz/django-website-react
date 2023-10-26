from .models import *
from .serializer import *
from django.shortcuts import render
from rest_framework import generics

class ReactView(generics.ListCreateAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer