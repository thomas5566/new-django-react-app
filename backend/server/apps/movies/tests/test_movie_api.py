import tempfile
import os

from PIL import Image

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Movie, Tag, Comment

from movie.serializers import MovieSerializer, MovieDetailSerializer


MOVIES_URL = reverse('movie:movie-list')


def image_upload_url(movie_id):
    """Return URL for movie image upload"""
    return reverse('movie:movie-upload-image', args=[movie_id])


def detail_url(movie_id):
    """Return movie detail URL"""
    return reverse('movie:movie-detail', args=[movie_id])


def sample_tag(user, name='Thriller'):
    """Create and return a sample tag"""
    return Tag.objects.create(user=user, name=name)


def sample_comment(user, title='GG88'):
    """Create and return a sample comment"""
    return Comment.objects.create(user=user, title=title)


def sample_movie(user, **params):
    """Create and return a sample movie"""
    defaults = {
        "title": 'Avengers 4',
        "duration": 5,
        "amount_reviews": 100,
        "rating": 5,
        'release_date': '2020-04-22',
        'last_modified': '2020-04-22',
        'link': 'www.test.com',
    }
    defaults.update(params)

    return Movie.objects.create(user=user, **defaults)


class PublicMovieApiTests(TestCase):
    """Test unauthenticated movie API access"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test the autheticaiton is required"""
        res = self.client.get(MOVIES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateMovieApiTests(TestCase):
    """Test authenticated movie API access"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@gmail.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    # def test_retrieve_movies(self):
    #     """Test retrieveing list of movies"""
    #     sample_movie(user=self.user)
    #     sample_movie(user=self.user)

    #     res = self.client.get(MOVIES_URL)

    #     movies = Movie.objects.all().order_by('-id')
    #     serializer = MovieSerializer(movies, many=True)
    #     self.assertEqual(res.status_code, status.HTTP_200_OK)
    #     self.assertEqual(res.data, serializer.data)

    def test_movies_limited_to_user(self):
        """Test retrieving movie for user"""
        user2 = get_user_model().objects.create_user(
            'other@gmail.com',
            'password123'
        )
        sample_movie(user=user2)
        sample_movie(user=self.user)

        res = self.client.get(MOVIES_URL)

        movies = Movie.objects.filter(user=self.user)
        serializer = MovieSerializer(movies, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data, serializer.data)

    def test_view_movie_detail(self):
        """Test viewing a recipe detail"""
        movie = sample_movie(user=self.user)
        movie.tags.add(sample_tag(user=self.user))
        movie.comments.add(sample_comment(user=self.user))

        url = detail_url(movie.id)
        res = self.client.get(url)

        serializer = MovieDetailSerializer(movie)
        self.assertEqual(res.data, serializer.data)

    def test_partial_update_movie(self):
        """Test updating a movie with patch"""
        movie = sample_movie(user=self.user)
        movie.tags.add(sample_tag(user=self.user))
        new_tag = sample_tag(user=self.user, name='War film')

        payload = {'title': 'Saving Private Ryan', 'tags': [new_tag.id]}
        url = detail_url(movie.id)
        self.client.patch(url, payload)

        movie.refresh_from_db()
        self.assertEqual(movie.title, payload['title'])
        tags = movie.tags.all()
        self.assertEqual(len(tags), 1)
        self.assertIn(new_tag, tags)

    def test_full_update_movie(self):
        """Test updating a movie with PUT"""
        movie = sample_movie(user=self.user)
        movie.tags.add(sample_tag(user=self.user))

        payload = {
            'title': 'Joker',
            'duration': 2,
            'amount_reviews': "5566"
        }
        url = detail_url(movie.id)
        self.client.put(url, payload)

        movie.refresh_from_db()
        self.assertEqual(movie.title, payload['title'])
        self.assertEqual(movie.duration, payload['duration'])
        self.assertEqual(movie.amount_reviews, payload['amount_reviews'])
        tags = movie.tags.all()
        self.assertEqual(len(tags), 0)


class MovieImageUploadTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'user@gmail.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)
        self.movie = sample_movie(user=self.user)

    def tearDown(self):
        self.movie.image.delete()

    def test_upload_image_to_recipe(self):
        """Test uploading an image to movie"""
        url = image_upload_url(self.movie.id)

        with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
            img = Image.new('RGB', (10, 10))
            img.save(ntf, format='JPEG')

            ntf.seek(0)
            res = self.client.post(url, {'image': ntf}, format='multipart')

        self.movie.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('image', res.data)
        self.assertTrue(os.path.exists(self.movie.image.path))

    def test_upload_image_bad_request(self):
        """Test uploading an invalid image"""
        url = image_upload_url(self.movie.id)
        res = self.client.post(url, {'image': 'notimage'}, format='multipart')

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_filter_movies_by_tags(self):
        """Test returning movies with specific tags"""
        movie1 = sample_movie(user=self.user, title='Monster Hunter')
        movie2 = sample_movie(user=self.user, title='Joker')
        tag1 = sample_tag(user=self.user, name='Science fiction')
        tag2 = sample_tag(user=self.user, name='Adventure')
        movie1.tags.add(tag1)
        movie2.tags.add(tag2)
        movie3 = sample_movie(user=self.user, title='55688')

        res = self.client.get(
            MOVIES_URL,
            {'tags': '{},{}'.format(tag1.id, tag2.id)}
        )

        serializer1 = MovieSerializer(movie1)
        serializer2 = MovieSerializer(movie2)
        serializer3 = MovieSerializer(movie3)
        self.assertIn(serializer1.data, res.data)
        self.assertIn(serializer2.data, res.data)
        self.assertNotIn(serializer3.data, res.data)

    def test_filter_movies_by_comments(self):
        """Test returning recipes with specific comments"""
        movie1 = sample_movie(user=self.user, title='Monster Hunter')
        movie2 = sample_movie(user=self.user, title='Joker')
        comment1 = sample_comment(user=self.user, title='Science fiction')
        comment2 = sample_comment(user=self.user, title='Adventure')
        movie1.comments.add(comment1)
        movie2.comments.add(comment2)
        movie3 = sample_movie(user=self.user, title='55688')

        res = self.client.get(
            MOVIES_URL,
            {'comments': '{},{}'.format(comment1.id, comment2.id)}
        )

        serializer1 = MovieSerializer(movie1)
        serializer2 = MovieSerializer(movie2)
        serializer3 = MovieSerializer(movie3)
        self.assertIn(serializer1.data, res.data)
        self.assertIn(serializer2.data, res.data)
        self.assertNotIn(serializer3.data, res.data)
