from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Topic(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True)
    body = models.TextField()
    pub_date = models.DateField(default=timezone.now)

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    pub_date = models.DateField(default=timezone.now)

class Tip(models.Model):
    text = models.TextField()

class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
