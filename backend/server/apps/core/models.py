import uuid
import os
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


from django.conf import settings
from django.db.models.deletion import CASCADE


# def movie_image_file_path(instance, filename):
#     """Generate file path for new movie image"""
#     ext = filename.split('.')[-1]
#     filename = f'{uuid.uuid4()}.{ext}'

#     return os.path.join('upload/movie/', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Create and saves a new User"""
        if not email:
            raise ValueError("User must have an email address")

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Create and saves a new super user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Tag(models.Model):
    """Tag to be used for a recipe"""
    name = models.CharField(max_length=255)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=CASCADE,
    )

    def __str__(self):
        return self.name


class Movie(models.Model):
    """Movielist object"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=1
    )
    title = models.CharField(max_length=255)
    duration = models.CharField(max_length=255, blank=True, null=True)
    amount_reviews = models.IntegerField("Amount_reviews",
                                         blank=True)
    rating = models.DecimalField(max_digits=5,
                                 decimal_places=2,
                                 blank=True,
                                 null=True)
    release_date = models.CharField('Release_date',
                                    max_length=255,
                                    blank=True,
                                    null=True)
    last_modified = models.DateTimeField('Last_modified',
                                         auto_now=True,
                                         blank=True,
                                         null=True)
    critics_consensus = models.TextField('Critics_consensus', blank=True, null=True)
    link = models.CharField(max_length=255, blank=True, null=True)
    comments = models.ManyToManyField('Comment', blank=True)
    tags = models.ManyToManyField('Tag', blank=True)
    images = models.ImageField("Images", blank=True, upload_to="./web/media/")

    def __str__(self):
        return self.title


class Comment(models.Model):
    """User leave a nice comment for movie"""
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    date = models.CharField("Date", max_length=255, blank=True)
    contenttext = models.TextField('Contenttext', blank=True)
    last_modified = models.DateTimeField('Last_modified',
                                         auto_now=True,
                                         blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title


class MovieImage(models.Model):
    movie = models.ForeignKey(Movie, default=None, on_delete=models.CASCADE)
    images = models.ImageField(upload_to="./web/media/")

    def __str__(self):
        return self.movie.title


class PttComment(models.Model):
    author = models.CharField("Author", max_length=255, blank=True)
    contenttext = models.TextField("Contenttext", blank=True)
    date = models.CharField("Date", max_length=255, blank=True)
    title = models.CharField("Title", max_length=255, blank=True)
    key_word = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="pttcomments")

    def __str__(self):
        return self.title


class CountGoodAndBad(models.Model):
    good_ray = models.IntegerField("Good_ray", default=0)
    bad_ray = models.IntegerField("Bad_ray", default=0)
    movie = models.ForeignKey(Movie, default=None, on_delete=models.CASCADE)

    def __str__(self):
        return self.movie.title
