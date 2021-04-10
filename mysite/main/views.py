from django.shortcuts import render

from django.shortcuts import get_object_or_404,render
from django.views import generic
from .models import Post

class PostView(generic.ListView):
    template_name = "main/post_list"
    context_object_name = "object_list"
    
    def get_queryset(self):
        return Post.objects.order_by('-pub date')

def home(request):
    return render(request, 'main/home.html')
