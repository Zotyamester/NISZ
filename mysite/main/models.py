from django.db import models
from django.contrib.auth.models import User

class Topic(models.Model):
    name = models.CharField(max_length=30)

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True)
    body = models.TextField()

    pub_date = models.DateField('date published')

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()

class Tip(models.Model):
    text = models.TextField()

class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
