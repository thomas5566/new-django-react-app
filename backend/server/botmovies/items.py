# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html
import sys
import os
import django
sys.path.append("..")
os.environ["DJANGO_SETTINGS_MODULE"] = "server.settings"
django.setup()

import scrapy
from apps.core.models import Movie
from apps.core.models import Comment


class BotmoviesItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass


class PttCloudItem(scrapy.Item):
    django_model = Comment
    title = scrapy.Field()
    author = scrapy.Field()
    date = scrapy.Field()
    last_modified = scrapy.Field()
    contenttext = scrapy.Field()


class YahooCloudItem(scrapy.Item):
    django_model = Movie
    title = scrapy.Field()
    critics_consensus = scrapy.Field()
    release_date = scrapy.Field()
    duration = scrapy.Field()
    tags = scrapy.Field()
    rating = scrapy.Field()
    amount_reviews = scrapy.Field()
    images = scrapy.Field()
    image_urls = scrapy.Field()
