# Create your views here.
from django.shortcuts import render

# Serve React's index.html
def index(request):
    return render(request, 'index.html')