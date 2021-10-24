from django.contrib.auth.models import User
from django.db import models
from django.shortcuts import reverse
from django.utils import timezone
from PIL import Image


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.png', upload_to='profile_pics')
    bio = models.TextField(max_length=500, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)

    def __str__(self):
        return self.user


class Group(models.Model):
    name = models.CharField(max_length=50, unique=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='owned_groups')
    users = models.ManyToManyField(User, through='UserGroup')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('group-detail', kwargs={'pk': self.pk})

    def get_member(self, user):
        return UserGroup.objects.filter(user=user, group=self).first()

    def user_is_member(self, user):
        return self.get_member(user) != None


class UserGroup(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='usergroups')
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    join_date = models.DateField(default=timezone.now)


class Event(models.Model):
    title = models.CharField(max_length=100)
    creator = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='events')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='events')
    start = models.DateTimeField()
    end = models.DateTimeField()

    def __str__(self):
        return 'event_%d_%s' % (self.id, self.title)
