# Mapping

- TopoJSON
- Google Maps
- FourSquare
- NYC Open Data

### TODO
- BUTTONS:
	- bicycle route layer
	- bike parking layer
	- show/hide neighborhood boundaries and bike routes
		- HOVER over polygon show hood name
	- popup small box of information
- MODAL: 'about this project', 'contact'

## Sources
### TopoJSON
- [Inferring Topology From Geometry, Mike Bostock](https://bost.ocks.org/mike/topology/)
- [Visvalingam’s Algorithm: Simplification of Polygons in Maps, Jason Davies](https://www.jasondavies.com/simplify/)
- [Line Simplification, Mike Bostock](https://bost.ocks.org/mike/simplify/)
### Geodata
- [2015 Overview of Digital Mapping Options](https://www.citylab.com/design/2015/06/who-owns-the-digital-map-of-the-world/396119/)



## Consuming Twitter and FourSquare APIs

[Blog Post on Twitter GET](http://elainechan.nyc/twitter-api/)

### Tweepy Streaming Steps
1. Authenticate using four tokens.
2. Create a live streaming listener.
3. Save data in two formats simultaneously:
	a. Use `data` parameter and save as `JSON`.
	b. Use `status` parameter and save as `txt`.

### Node Twitter Search

## Use Cases
* 'How sick is Denver?' 
	- For a given geograpic area, at what rate are people tweeting 'cough'?
* News tracking: correctly detect topic + sentiment from a block of tweets.
	- Can we predict flu epidemic in X city? (search by geolocation)
	- Is there a current housing crisis in San Francisco, comparing yoy? (search by geo and time)
		* Time series analysis
			* Severity y-o-y, m-o-m ('20% increase over last month')
			* Volume of tweets y-o-y, m-o-m
			* number of evictions y-o-y, m-o-m
		* Sentiment analysis (varies based on search: 'homeless', 'evicted' are definitely negative)
		* Last step: monthly tweet sent out saying 'evictions appear to be up in San Francisco'
		* (Later version: to work around rate limits, use seperate Twitter accounts/Oauth credentials for individual major cities)

## Techniques
* (Database: MongoDB)
* Reading data: Node file.fs, python io

## Sample Project: Trendline
Less ambitious, more portfolio-like: "first node/express app on Heroku"

### Live Update Version
* Present embedded tweets related to the trend
* Use D3 to present the trend line
	- Hover over trendline: display a single tweet that represents the trend and hyperlink to view original tweet on Twitter

### Static Version
* If scanning historical and current tweets for trends in a city, could present trend data periodically (using Heroku scheduler, 'run once a day')
* API calls will come from frontend JavaScript
	1. Python script writes out some JSON with the 'analysis results'
	2. That JSON is dropped into the top of your `app.js` file
	3. The same `app.js` file makes API calls to D3, maybe to embed some tweets
* "Datastore" is just `var Store = {}`
* Use heroku to serve `index.html`, `index.css` and `app.js` files
* Once the first Node/Express app is 'up' on Heroku, you can put files in the `/public` folder and they'll be served verbatim with no extra logic required

## Sources
* [The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality: Evidence from San Francisco](http://conference.nber.org/confer//2017/PEf17/Diamond_McQuade_Qian.pdf)
* [1000 Largest U.S. Cities Data in JSON](https://gist.github.com/Miserlou/c5cd8364bf9b2420bb29)

### Collect Data
* Write to file with .get tweets passing params
* Refine search to make sure we're getting 'valid' tweets
* Parse those results for data
* Within this time range, in this geo location, matching this query, how many tweets are there?

page=1
result=[]
page=100
if (result.length = 0)
{request with page= 50}
{request page=25}
the service knows it has 100 results:
impossible: (you ask for page 1, 50 results per page, it gives you a full array)

"take a look at some example tweets"
sentiment analysis week by week

curl https://api.twitter.com/1.1/search/tweets.json?

q='to%3ANASA&tweet_mode=extended'

Twitter search API
15 requests in 15 minutes
setTimeout() to space out requests
have dataset by Tuesday

// Take 200s break in setTimeout
```javascript
function getCityData(){
    //request data cities[currentCityIndex]
    //log out the result
    currentCityIndex ++;
    setTimeout(getCityData, 100000)
}
getCityData();
```