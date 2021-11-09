from rest_framework import serializers
from rest_framework.fields import (IntegerField, ReadOnlyField,
                                   SerializerMethodField)

from .models import Group


class GroupListSerializer(serializers.ModelSerializer):
    owner_name = ReadOnlyField(source='owner.username')
    user_count = IntegerField(source='users.count')

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'owner_name', 'user_count']


class GroupDetailSerializer(serializers.ModelSerializer):
    owner_name = ReadOnlyField(source='owner.username')
    users = SerializerMethodField()

    def get_users(self, group):
        return [{'username': user.username, 'url': f'/profiles/{user.id}/'} for user in group.users.all()]

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'owner_name', 'users']
