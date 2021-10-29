from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.relations import HyperlinkedIdentityField
from rest_framework.response import Response

from .models import Event, Group, UserGroup
from .permissions import IsOwnerOrReadOnly
from .serializers import GroupSerializer, UserSerializer


def group_base(request):
    return render(request, 'groups/index.html')


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    @action(detail=True)
    def join(self, request, *args, **kwargs):
        user = self.request.user
        group = self.get_object()
        if not group.user_is_member(user):
            usergroup = UserGroup(user=user, group=group)
            usergroup.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True)
    def leave(self, request, *args, **kwargs):
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


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_serializer_class(self, *args, **kwargs):
        group_choices = [x.group for x in self.request.user.usergroups.all()]

        class EventSerializer(serializers.ModelSerializer):
            url = HyperlinkedIdentityField('groups:event-detail')
            group = serializers.ChoiceField(group_choices, write_only=True)
            owner_name = serializers.ReadOnlyField(
                source='owner.username')
            group_name = serializers.ReadOnlyField(
                source='group.name')

            class Meta:
                model = Event
                fields = ['id', 'url', 'title', 'group',
                          'owner_name', 'group_name', 'start', 'end']

        return EventSerializer
