from django.contrib import admin
from .models import Topic, Post, Comment, Tip

admin.AdminSite.site_title = 'NISZ'
admin.AdminSite.site_header = 'NISZ administration'
admin.site.register(Topic)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Tip)
