from django.contrib import admin
from .models import Topic, Post, Comment, Tip, About, FAQ

admin.AdminSite.site_title = 'NISZ'
admin.AdminSite.site_header = 'NISZ adminisztráció'
admin.AdminSite.index_title = 'Oldal adminisztráció'
admin.site.register(Topic)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Tip)
admin.site.register(About)
admin.site.register(FAQ)
