# Generated by Django 3.1.5 on 2021-01-18 18:35

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bookshelf', '0002_auto_20210118_1326'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='visitedbooks',
            unique_together={('user_id', 'bookid')},
        ),
    ]
