# Generated by Django 4.1.dev20211018205107 on 2021-10-24 13:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('accounts', '0003_auto_20210411_0043'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='auth.user')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.group')),
            ],
        ),
    ]
