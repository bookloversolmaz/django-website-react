from django.shortcuts import render
from .models import Post
# Views are Python functions or classes that receive a web request and return a web response

# Below will display a list of all of the posts
def writing_index(request):
    posts = Post.objects.all().order_by("-created_on") # A Queryset is a collection of all the objects in the database that match the query
    context = {
        "posts": posts,
    }
    return render(request, "writing/index.html", context)

#  Display the full post
def writing_detail(request, pk):
    post = Post.objects.get(pk=pk) # Takes a primary key value, pk, as an argument and retrieves the object with the given pk. Pk is unique identifier of entry in database
    context = {
        "post": post,
    }

    return render(request, "blog/detail.html", context)