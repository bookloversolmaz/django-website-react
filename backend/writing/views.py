from writing.models import Post
from writing.serializer import PostSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class WritingListView(APIView):

    serializer_class = PostSerializer

    def get(self, request):

        posts = Post.objects.all().order_by("publication_date")

        serializer = PostSerializer(
            posts,
            many=True,
            context={"request": request},
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


class WritingEntireView(APIView):

    serializer_class = PostSerializer

    def get(self, request, pk):

        try:

            post = Post.objects.get(pk=pk)

            serializer = PostSerializer(
                post,
                context={"request": request},
            )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        except Post.DoesNotExist:

            return Response(
                {"error": "Post not found"},
                status=status.HTTP_404_NOT_FOUND,
            )