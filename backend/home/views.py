from rest_framework.response import Response
from rest_framework.views import APIView
from todo.models import React

class HomeView(APIView):
    def get(self, request):

        # Display links to to do list, software projects and writing
        # TODO: Create link to todo page

        todo_page = React
        
        # The below dictionary is the data inserted into the response
        response_data = {
            'todo_page': "/todo/",  # Link to the todo page
            # "software_projects": "/software_projects/",  # Link to software projects page
            # "writing": "/writing/"  # Link to writing page
        }
        return Response(response_data)