# Generated by Django 3.2.12 on 2024-11-10 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('writing', '0002_remove_post_updated_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='created_on',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='publication_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
