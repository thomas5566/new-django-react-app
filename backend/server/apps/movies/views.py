from django.views import generic
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import generics, viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from ..core.models import Tag, Comment, Movie, MovieImage, PttComment, CountGoodAndBad

from . import serializers


class BasseMovielistAttrViewSet(viewsets.GenericViewSet,
                                mixins.ListModelMixin,
                                mixins.CreateModelMixin):
    """Base viewset for user owned movielist attributes"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(movie__isnull=False)

        return queryset.filter(
            user=self.request.user
        ).order_by('-name').distinct()

    def perform_create(self, serializer):
        """Create a new comment"""
        serializer.save(user=self.request.user)


class TagViewSet(BasseMovielistAttrViewSet):
    """Manage tags in the database"""
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer


class CommentViewSet(viewsets.GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin):
    """Manage comment in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(movie__isnull=False)

        return queryset.filter(
            user=self.request.user
        ).order_by('-title').distinct()

    def perform_create(self, serializer):
        """Create a new comment"""
        serializer.save(user=self.request.user)


class MovieViewSet(viewsets.ModelViewSet):
    """Manage movielist in the database"""
    serializer_class = serializers.MovieSerializer
    queryset = Movie.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers"""
        return [int(str_id) for str_id in qs.split(',')]

    # def get_queryset(self):
    #     """Retrieve the movielist for the authenticated user"""
    #     tags = self.request.query_params.get('tags')
    #     comments = self.request.query_params.get('comments')
    #     queryset = self.queryset

    #     if tags:
    #         tag_ids = self._params_to_ints(tags)
    #         queryset = queryset.filter(tags__id__in=tag_ids)

    #     if comments:
    #         comments_ids = self._params_to_ints(comments)
    #         queryset = queryset.filter(comments__id__in=comments_ids)

    #     return queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.MovieDetailSerializer
        elif self.action == 'upload_image':
            return serializers.MovieImageSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new movie"""
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['POST'], url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a movie"""
        movie = self.get_object()
        serializer = self.get_serializer(
            movie,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class MovieImageViewSet(viewsets.GenericViewSet,
                        mixins.ListModelMixin,
                        mixins.CreateModelMixin):
    queryset = MovieImage.objects.all()
    serializer_class = serializers.MovieImageSerializer


class PttCommentViewSet(viewsets.GenericViewSet,
                        mixins.ListModelMixin,
                        mixins.CreateModelMixin):
    queryset = PttComment.objects.all()
    serializer_class = serializers.PttCommentSerializer


class CountGoodAndBadViewSet(viewsets.GenericViewSet,
                             mixins.ListModelMixin,
                             mixins.CreateModelMixin):
    queryset = CountGoodAndBad.objects.all()
    serializer_class = serializers.CountGoodAndBadSerializer
