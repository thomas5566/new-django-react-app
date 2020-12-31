from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from botmovies.spiders.ptt import PttMoviesSpider
from botmovies.spiders.yahoo import YahooSpider


process = CrawlerProcess(get_project_settings())
# process.crawl(PttMoviesSpider)
process.crawl(YahooSpider)
process.start()
