# Generated by Django 3.1.4 on 2021-01-12 03:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210112_1137'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movieimage',
            name='movie',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='movieimages', to='core.movie'),
        ),
    ]