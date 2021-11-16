from datetime import datetime

from django.db.models import Q
from django.utils import timezone
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import (IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.response import Response

from .models import Event, Group, UserGroup
from .permissions import IsOwnerOrReadOnly
from .serializers import GroupDetailSerializer, GroupListSerializer


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = Group.objects.all()
        if self.action == 'list':
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(Q(name__icontains=q) | Q(description__icontains=q))
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return GroupListSerializer
        else:
            return GroupDetailSerializer

    @action(detail=True, permission_classes=[IsAuthenticated])
    def join(self, *args, **kwargs):
        user = self.request.user
        group = self.get_object()
        if not group.user_is_member(user):
            usergroup = UserGroup(user=user, group=group)
            usergroup.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, permission_classes=[IsAuthenticated])
    def leave(self, *args, **kwargs):
        user = self.request.user
        group = self.get_object()
        if group.user_is_member(user):
            usergroup = UserGroup.objects.get(user=user, group=group)
            usergroup.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Event.objects.all()
        if self.action == 'list':
            group = self.request.query_params.get('group')
            if group:
                queryset = queryset.filter(group__id=group)
            start = self.request.query_params.get('start')
            if start:
                queryset = queryset.filter(end__gte=timezone.localtime(
                    datetime.utcfromtimestamp(start / 1e3)))
            end = self.request.query_params.get('end')
            if end:
                queryset = queryset.filter(start__lte=timezone.localtime(
                    datetime.utcfromtimestamp(end / 1e3)))
        return queryset

    def get_serializer_class(self):
        group_choices = [x.group for x in self.request.user.usergroups.all(
        )] if self.request.user.is_authenticated else []

        class EventSerializer(serializers.ModelSerializer):
            group = serializers.ChoiceField(group_choices, write_only=True)
            owner_name = serializers.ReadOnlyField(
                source='owner.username')

            class Meta:
                model = Event
                fields = ['id', 'title', 'group',
                          'owner_name', 'start', 'end']

        return EventSerializer
