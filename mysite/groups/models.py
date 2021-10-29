from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
from django.shortcuts import reverse
from django.utils import timezone


class Group(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=500, blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='owned_groups')
    users = models.ManyToManyField(User, through='UserGroup')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('groups:group-detail', kwargs={'pk': self.pk})

    def get_member(self, user):
        return UserGroup.objects.filter(user=user, group=self).first()

    def user_is_member(self, user):
        return self.get_member(user) != None


class UserGroup(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='usergroups')
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE)
    join_date = models.DateField(default=timezone.now)

    def __str__(self):
        return '%s - %s' % (self.user.username, self.group.name)


class Event(models.Model):
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='events')
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, related_name='events')
    start = models.DateTimeField()
    end = models.DateTimeField(validators=[])

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.start > self.end:
            raise ValidationError(
                'Nem kezdődhet később, mint a befejezés időpontja.')
        super(Event, self).save(*args, **kwargs)
