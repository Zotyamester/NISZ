# Generated by Django 3.1.7 on 2021-04-10 19:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_auto_20210410_2102'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-pub_date', 'author']},
        ),
    ]
