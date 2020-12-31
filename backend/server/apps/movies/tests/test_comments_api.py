from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Comment, Movie

from movie.serializers import CommentSerializer


COMMENT_URL = reverse('movie:comment-list')


class PublicCommentApiTests(TestCase):
    """Test the publically available comment api"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login is required to access this endpoint"""
        res = self.client.get(COMMENT_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateCommentAPITests(TestCase):
    """Test comment can be retriened by authorized user"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@gmail.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_comment_list(self):
        """Test retriening a list of comment"""
        Comment.objects.create(user=self.user, title='5566987')
        Comment.objects.create(user=self.user, title='7788G8')

        res = self.client.get(COMMENT_URL)

        comments = Comment.objects.all().order_by('-title')
        serializer = CommentSerializer(comments, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_comments_limited_to_user(self):
        """Test that comments for the authenticated user are returned"""
        user2 = get_user_model().objects.create_user(
            'other@gmail.com',
            'testpass'
        )
        Comment.objects.create(user=user2, contenttext='GG88')
        comment = Comment.objects.create(
            user=self.user, contenttext='Good goood!!')

        res = self.client.get(COMMENT_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['contenttext'], comment.contenttext)

    def test_create_comment_successful(self):
        """Test creating a new ingredient"""
        payload = {'title': 'Cabbage'}
        self.client.post(COMMENT_URL, payload)

        exists = Comment.objects.filter(
            user=self.user,
            title=payload['title']
        ).exists()
        self.assertTrue(exists)

    def test_create_comment_invalid(self):
        """Test creating invalid ingredient fails"""
        payload = {'title': ''}
        res = self.client.post(COMMENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_comments_asssigned_to_movies(self):
        """Test filtering comments by those assigned to movies"""
        comment1 = Comment.objects.create(
            user=self.user, title='Very bad!! sucks!!!'
        )
        comment2 = Comment.objects.create(
            user=self.user, title='God damn good!!'
        )
        movie = Movie.objects.create(
            title='Jocker',
            duration=1,
            amount_reviews=5566,
            rating=1.5,
            user=self.user
        )
        movie.comments.add(comment1)

        res = self.client.get(COMMENT_URL, {'assigned_only': 1})

        serializer1 = CommentSerializer(comment1)
        serializer2 = CommentSerializer(comment2)
        self.assertIn(serializer1.data, res.data)
        self.assertNotIn(serializer2.data, res.data)

    def test_retrieve_comment_assigned_unique(self):
        """Test filtering comments by assigned returns unique items"""
        comment = Comment.objects.create(user=self.user, title='Eggs')
        Comment.objects.create(user=self.user, title='very good!!')
        movie1 = Movie.objects.create(
            title='5566',
            duration=1,
            amount_reviews=5566,
            rating=1.5,
            user=self.user
        )
        movie1.comments.add(comment)
        movie2 = Movie.objects.create(
            title='Jocker',
            duration=1,
            amount_reviews=5566,
            rating=1.5,
            user=self.user
        )
        movie2.comments.add(comment)

        res = self.client.get(COMMENT_URL, {'assigned_only': 1})

        self.assertEqual(len(res.data), 1)
