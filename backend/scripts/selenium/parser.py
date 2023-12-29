import feedparser

def injuryReport(website):

    url = website
    f = feedparser.parse(url)
    for entry in f.entries: 
        print(entry)

    #https://www.youtube.com/watch?v=n7K7Inkk9Jc&ab_channel=JCharisTech


# injuries = injuryReport("https://www.rotowire.com/rss/news.php?sport=NBA")