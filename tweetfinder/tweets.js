'use strict';

const Twitter = require('/Users/Leo/Mapping/node_modules/twitter');
const config = require('./config.js');
const fs = require('fs');
const cities = require('/Users/Leo/Mapping/cities.js');

var client = new Twitter(config);
var params = {
	q: '%23donaldtrump',
	geocode: '40.7127837,-74.0059413,10mi',
	count: 5,
	result_type: 'recent',
	lang: 'en',
	truncated: false,
	tweet_mode: 'extended',
	retweeted_status:
	{
		truncated: false
	}
}

function getTweets() {
	client.get('search/tweets', params, (err, data) => {
		if(err) throw err;
		var tweets = [];
		data.statuses.forEach(entry => {
			tweets.push(entry.full_text); // full_text in retweets are always truncated
		});
		var uniqueTweets = tweets.filter(onlyUnique);
		console.log(uniqueTweets);
		return uniqueTweets;
	});
}
// Discards duplicate tweets
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

var currentCityIndex = 0;
var tweetObjects = [];
function getCityData(query='%23donaldtrump', cityCount=3, tweetCount=5) {
	setTimeout(function() {
		let lat = cities[currentCityIndex].latitude;
		let lon = cities[currentCityIndex].longitude;
		params.q = '%23donaldtrump';
		params.geocode = `${lat},${lon},10mi`;
		params.count = tweetCount;
		console.log(`Adding tweets from ${cities[currentCityIndex].city}...`);
		getTweets();
		
		var currentCityData = new Object,
		    city = cities[currentCityIndex].city,
		    tweets = getTweets();
		tweetObjects.push(currentCityData);
		console.log(JSON.stringify(tweetObjects));
		
		currentCityIndex++;
		if(currentCityIndex < cityCount) {
			getCityData();
		}
	}, 10000);
	return tweetObjects;
}
fs.appendFile('tweet-text.json', JSON.stringify(getCityData()), err => {
	if (err) throw err;
});