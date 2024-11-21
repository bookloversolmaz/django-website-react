from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project
from .serializer import ProjectSerializer

class ProjectListView(APIView):
    # List items or create a new item
    serializer_class = ProjectSerializer
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)