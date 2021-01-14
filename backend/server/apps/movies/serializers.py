from rest_framework import serializers

from ..core.models import Tag, Comment, Movie, SliderMovieImage, PttComment, CountGoodAndBad


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
        fields = ('id', 'title', 'author', 'date', 'contenttext', 'last_modified')
        read_only_fields = ('id', 'last_modified')


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


class SliderMovieImageSerializer(serializers.ModelSerializer):
    """Serializer for upload Muti-Movie images to movies"""
    # image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = SliderMovieImage
        fields = ('id', 'images', 'movie')
        read_only_fields = ('id',)


class MovieImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to movies"""

    class Meta:
        model = Movie
        fields = ('id', 'images')
        read_only_fields = ('id',)


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

    pttcomments = PttCommentSerializer(many=True)
    countgoodandbads = CountGoodAndBadSerializer(many=True)

    class Meta:
        model = Movie
        fields = (
            'id', 'title', 'duration', 'amount_reviews', 'rating',
            'release_date', 'last_modified', 'link', 'comments',
            'tags', 'images', 'critics_consensus', 'slidermovieimages',
            'pttcomments', 'countgoodandbads',
        )
        read_only_fields = ('id',)

    def create(self, validated_data):
        """Show ForeignKey PttComment & CountGoodAndBad on Movie Serializer"""
        pttcomments_data = validated_data.pop('pttcomments')
        countgoodandbads_data = validated_data.pop('countgoodandbads')
        slidermovieimages_data = validated_data.pop('slidermovieimages')

        movie = Movie.objects.create(**validated_data)

        for pttcomment_data in pttcomments_data:
            PttComment.objects.create(movie=movie, **pttcomment_data)

        for countgoodandbad_data in countgoodandbads_data:
            CountGoodAndBad.objects.create(movie=movie, **countgoodandbad_data)

        for slidermovieimage_data in slidermovieimages_data:
            SliderMovieImage.objects.create(movie=movie, **slidermovieimage_data)

        return movie


class MovieDetailSerializer(MovieSerializer):
    """Serializer a movie detail"""
    comments = CommentSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)


# class YahooMovieSerializer(serializers.ModelSerializer):
#     """Serialize a YahooMovielist"""

#     class Meta:
#         model = Movie
#         fields = (
#             'id', 'title', 'duration', 'amount_reviews', 'rating',
#             'release_date', 'last_modified', 'link', 'comments',
#             'tags', 'images',
#         )
#         read_only_fields = ('id',)
