from django.shortcuts import render

from django.shortcuts import get_object_or_404,render
from django.views import generic
from .models import Post

class PostListView(generic.ListView):
    model = Post
    ordering = ['-pub_date']

def home(request):
    return render(request, 'main/home.html')
