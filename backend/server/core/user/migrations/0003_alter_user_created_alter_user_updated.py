# Generated by Django 4.2.3 on 2023-07-17 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_user', '0002_user_avatar_user_bio_alter_user_is_active_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
