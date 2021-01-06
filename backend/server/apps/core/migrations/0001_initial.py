# Generated by Django 3.1.4 on 2021-01-04 01:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('author', models.CharField(max_length=255)),
                ('date', models.CharField(blank=True, max_length=255, verbose_name='Date')),
                ('contenttext', models.TextField(blank=True, verbose_name='Contenttext')),
                ('last_modified', models.DateTimeField(auto_now=True, verbose_name='Last_modified')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('duration', models.CharField(blank=True, max_length=255, null=True)),
                ('amount_reviews', models.IntegerField(blank=True, verbose_name='Amount_reviews')),
                ('rating', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('release_date', models.CharField(blank=True, max_length=255, null=True, verbose_name='Release_date')),
                ('last_modified', models.DateTimeField(auto_now=True, null=True, verbose_name='Last_modified')),
                ('critics_consensus', models.TextField(blank=True, null=True, verbose_name='Critics_consensus')),
                ('link', models.CharField(blank=True, max_length=255, null=True)),
                ('images', models.ImageField(blank=True, upload_to='./web/media/', verbose_name='Images')),
                ('comments', models.ManyToManyField(blank=True, to='core.Comment')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PttComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(blank=True, max_length=255, verbose_name='Author')),
                ('contenttext', models.TextField(blank=True, verbose_name='Contenttext')),
                ('date', models.CharField(blank=True, max_length=255, verbose_name='Date')),
                ('title', models.CharField(blank=True, max_length=255, verbose_name='Title')),
                ('key_word', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pttcomments', to='core.movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ImageField(upload_to='./web/media/')),
                ('movie', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='core.movie')),
            ],
        ),
        migrations.AddField(
            model_name='movie',
            name='tags',
            field=models.ManyToManyField(blank=True, to='core.Tag'),
        ),
        migrations.AddField(
            model_name='movie',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='CountGoodAndBad',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('good_ray', models.IntegerField(default=0, verbose_name='Good_ray')),
                ('bad_ray', models.IntegerField(default=0, verbose_name='Bad_ray')),
                ('movie', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='core.movie')),
            ],
        ),
    ]
