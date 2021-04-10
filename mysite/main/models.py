from django.db import models
from django.shortcuts import reverse
from django.utils import timezone
from django.contrib.auth.models import User


class Topic(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True, blank=True)
    body = models.TextField()
    pub_date = models.DateField(default=timezone.now)

    def get_absolute_url(self):
        return reverse('main:post-detail', kwargs={'pk': self.pk})


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    pub_date = models.DateField(default=timezone.now)

    class Meta:
        ordering = ['-pub_date', 'author']

    def get_absolute_url(self):
        return reverse('main:post-detail', kwargs={'pk': self.pk}) + '#comment-' + self.pk


class Tip(models.Model):
    text = models.TextField()

    def get_a_tip():
        return Tip.objects.order_by('?').first()


class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
