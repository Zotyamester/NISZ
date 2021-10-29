from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from rest_framework.relations import (HyperlinkedIdentityField,
                                      HyperlinkedRelatedField)

from .models import Group


class GroupSerializer(serializers.ModelSerializer):
    url = HyperlinkedIdentityField('groups:group-detail')
    owner = ReadOnlyField(source='owner.username')
    users = HyperlinkedRelatedField(
        view_name='groups:user-detail', many=True, read_only=True)
    events = HyperlinkedRelatedField(
        view_name='groups:event-detail', many=True, read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'url', 'name', 'description',
                  'owner', 'users', 'events']


class UserSerializer(serializers.ModelSerializer):
    url = HyperlinkedIdentityField('groups:user-detail')
    owned_groups = HyperlinkedRelatedField(
        view_name='groups:group-detail', many=True, read_only=True)
    groups = HyperlinkedRelatedField(
        view_name='groups:group-detail', many=True, read_only=True)
    events = HyperlinkedRelatedField(
        view_name='groups:event-detail', many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'owned_groups', 'groups', 'events']
