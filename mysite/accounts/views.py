from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.shortcuts import redirect, render, get_object_or_404
from django.views.generic import (CreateView, DeleteView, DetailView, ListView,
                                  UpdateView)

from .forms import ProfileUpdateForm, UserRegisterForm, UserUpdateForm
from .models import Group, UserGroup


@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(
            request.POST, request.FILES, instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(
                request, 'A kért módosítások sikeresen végrehajtódtak.')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
    context = {
        'u_form': u_form,
        'p_form': p_form
    }
    return render(request, 'accounts/profile.html', context)


def register(request):
    if request.user.is_authenticated:
        return redirect('main:home')
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'A fiók létrejött')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'registration/register.html', {'form': form})


class GroupListView(ListView):
    model = Group
    ordering = ['name']
    paginate_by = 8


class GroupDetailView(DetailView):
    model = Group

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['is_member'] = self.request.user.is_authenticated and self.object.user_is_member(
            self.request.user)
        return context


@login_required
def group_leave(request, pk):
    group = get_object_or_404(Group, pk=pk)
    if request.user != group.owner:
        conn = group.get_member(request.user)
        if conn != None:
            conn.delete()
            messages.success(request, 'Sikeresen elhagyta a csoportot.')
    return redirect('group-list')


@login_required
def group_join(request, pk):
    group = get_object_or_404(Group, pk=pk)
    if request.user != group.owner:
        conn = group.get_member(request.user)
        if conn == None:
            conn = UserGroup(user=request.user, group=group)
            conn.save()
            messages.success(request, 'Sikeresen csatlakozott a csoporthoz.')
    return redirect(group)


class GroupCreateView(LoginRequiredMixin, CreateView):
    model = Group
    fields = ['name']

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)


class GroupUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Group
    fields = ['name']

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)

    def test_func(self):
        group = self.get_object()
        return self.request.user == group.author


class GroupDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Group
    success_url = '/'

    def test_func(self):
        group = self.get_object()
        return self.request.user == group.owner
