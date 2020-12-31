from rest_framework import serializers

from ..core.models import Tag, Comment, Movie, MovieImage, PttComment, CountGoodAndBad


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tag objects"""

    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for comment objects"""

    class Meta:
        model = Comment
        fields = ('id', 'title', 'author', 'date', 'contenttext', 'key_word', 'last_modified')
        read_only_fields = ('id', 'last_modified', 'key_word')


class MovieSerializer(serializers.ModelSerializer):
    """Serialize a Movielist"""
    comments = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Comment.objects.all()
    )
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all()
    )

    class Meta:
        model = Movie
        fields = (
            'id', 'title', 'duration', 'amount_reviews', 'rating',
            'release_date', 'last_modified', 'link', 'comments',
            'tags', 'images',
        )
        read_only_fields = ('id',)


class MovieDetailSerializer(MovieSerializer):
    """Serializer a movie detail"""
    comments = CommentSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)


class MovieImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to movies"""

    class Meta:
        model = Movie
        fields = ('id', 'images')
        read_only_fields = ('id',)


class MutiMovieImagesSerializer(serializers.ModelSerializer):
    """Serializer for upload Muti-Movie images to movies"""

    class Meta:
        model = MovieImage
        fields = ('id', 'movie', 'images')
        read_only_fields = ('id',)


class PttCommentSerializer(serializers.ModelSerializer):
    """Serializer for PttComments to movies"""

    class Meta:
        model = PttComment
        fields = ('id', 'author', 'contenttext', 'date', 'title', 'key_word')
        read_only_fields = ('id',)


class CountGoodAndBadSerializer(serializers.ModelSerializer):
    """Serializer for CountGoodAndBad to movies"""

    class Meta:
        model = CountGoodAndBad
        fields = ('id', 'good_ray', 'bad_ray', 'movie')
        read_only_fields = ('id',)
