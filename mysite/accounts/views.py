from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import login

def profile(request):
    return render(request, 'accounts/profile.html')

def register(request):
    form = UserCreationForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            user = form.save()
            messages.success(request, 'A fiók létrejött.')
            login(request, user)
            return redirect('main:home')
    return render(request, 'registration/register.html', {'form': form})
