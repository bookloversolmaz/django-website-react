# Generated by Django 4.2.5 on 2023-11-15 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_react_delete_description_delete_item'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='react',
            name='description',
        ),
    ]