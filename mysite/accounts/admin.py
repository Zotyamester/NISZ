from django.contrib import admin
from .models import Profile, Group, UserGroup

admin.site.register(Profile)
admin.site.register(Group)
admin.site.register(UserGroup)
