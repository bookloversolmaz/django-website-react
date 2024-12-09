from rest_framework.response import Response
from rest_framework.views import APIView
from django.urls import reverse

class HomeView(APIView):
    def get(self, request):
        # Get the URL for the to-do list page
        todo_page_url = reverse('todo/index.html')
        # blog_page_url = reverse('tictactoe')

        # The below dictionary is the data inserted into the response
        response_data = {
            'todo_page/index.html': todo_page_url,  # URL to the todo page
            # 'blog_page': blog_page_url,
            # Add more links if needed
        }
        return Response(response_data)