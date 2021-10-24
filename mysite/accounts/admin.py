from django.contrib import admin
from .models import Profile, Group, UserGroup, Event

admin.site.register(Profile)
admin.site.register(Group)

class UserGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'group', 'join_date')

admin.site.register(UserGroup, UserGroupAdmin)


admin.site.register(Event)
