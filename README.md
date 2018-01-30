# Untitled Mapping Project
## Current Features
- Displays on click:
	- [x] Bike parking
	- [x] Bike routes
	- [x] Neighborhood boundaries
- [NYC Open Data for Bikes](http://www.nyc.gov/html/dot/html/about/datafeeds.shtml#bikes)
- See [notes](https://github.com/elainechan/mapping/blob/master/notes.md) for development details.
---
## Features Wishlist
### Transit Information
- Subway stations, routes, and entrances/exits
- Rail stations, routes
- [NYC Street Closures due to construction activities by Intersection](https://data.cityofnewyork.us/Transportation/Street-Closures-due-to-construction-activities-by-/478a-yykk)
### Hyperlocal Information
#### News
* 'How sick is New York right now?' 
	- For a given geograpic area, at what rate are people tweeting symptoms and diseases ('cough', 'flu', 'sneeze', 'fever', 'allergy', etc.)?
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
##### Method: Source Tweets
* Using geolocation information (latlongs, neighborhoods, streets, landmarks, buildings, etc.), retrieve tweets using Twitter API.
* Provide input field for keyword queries.
* Display relevant tweets on page.
* Possible focus on tweets by neighborhood bloggers.
#### Activities
* Eat, drink - restaurants, cafes, bars
* Work, study - offices, schools, libraries, coworking spaces, cafes with wifi
* Play - bowling allies, parks, cinemas, theaters, concert venues, performance spaces, museums
##### Method: Source FourSquare Data
* Using geo information, retrieve nearby venues
* Provide menu for category (eat, drink, work, study, play), and input field for keyword queries.
#### Sources
* [NYC 311 Service Requests from 2010 to Present](https://nycopendata.socrata.com/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9)
* [NYC Open311 API](https://developer.cityofnewyork.us/api/open311-inquiry)
* [NYC Geoclient API](https://developer.cityofnewyork.us/api/geoclient-api)
* [NYC Neighborhood blogs](https://www.brickunderground.com/neighborhoodintel/best-nyc-neighborhood-blogs-2017)
* [Patch NYC](https://patch.com/new-york/new-york-city)
* [Curbed NY](https://ny.curbed.com/)
* [NYT](https://www.nytimes.com/section/nyregion)
* [NYPost](https://nypost.com/metro/)
* [NY Daily News](http://www.nydailynews.com/new-york)
### Trendline Analysis
* Static interactive visualization of a dataset
* Use D3 to present the trend line
	- Hover over trendline: display a single tweet that represents the trend and hyperlink to view original tweet on Twitter
* If scanning historical and current tweets for trends in a city, could present trend data periodically (using Heroku scheduler, 'run once a day')
* API calls will come from frontend JavaScript
	1. Python script writes out some JSON with the 'analysis results'
	2. That JSON is dropped into the top of your `app.js` file
	3. The same `app.js` file makes API calls to D3, maybe to embed some tweets
* "Datastore" is just `var Store = {}`
* Use heroku to serve `index.html`, `index.css` and `app.js` files
* Once the first Node/Express app is 'up' on Heroku, you can put files in the `/public` folder and they'll be served verbatim with no extra logic required
#### Sources
* [The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality: Evidence from San Francisco](http://conference.nber.org/confer//2017/PEf17/Diamond_McQuade_Qian.pdf)
* [1000 Largest U.S. Cities Data in JSON](https://gist.github.com/Miserlou/c5cd8364bf9b2420bb29)
