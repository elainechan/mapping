import tweepy
from tokens import * # Tokens are defined in a separate file for privacy

# The following tokens used are defined in a separate file
# Tokens can be obtained from Twitter
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
api = tweepy.API(auth)

# Create a live stream listener based on hashtag #goldenglobes.
# Save tweet data in JSON file.
class DataListener(tweepy.streaming.StreamListener):
	def on_data(self, data):
		try:
			with open('tweets.json', 'a') as f:
				f.write(data)
				return True
		except BaseException as e:
			print('Error on_data: %s' % str(e))
		return True

data_listener = DataListener()
data_stream = tweepy.streaming.Stream(auth, data_listener)
data_stream.filter(track=['#goldenglobes'], async=True) # Only get results with hashtag

# Save tweet status in text file.
class StatusListener(tweepy.streaming.StreamListener):
	def on_status(self, status):
		try:
			with open('tweets.txt', 'a') as f:
				f.write(status.text)
				return True
		except BaseException as e:
			print('Error on_status: %s' % str(e))
		return True

status_listener = StatusListener()
status_stream = tweepy.streaming.Stream(auth, status_listener)
status_stream.filter(track=['#goldenglobes'], async=True)