from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView

class ProjectView(APIView):
    def get(request):
        return HttpResponse

