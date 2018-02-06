# Project Notes
## TODO
- [x] Retain feature layer visibility state when switching map style.
- [x] Make UI responsive for mobile.
- [x] Drop-down menu for full list of map styles.
- [ ] Metadata panel toggle.
- [ ] Social media share buttons.
    - [ ] [Twitter](https://dev.twitter.com/web/tweet-button)
    - [ ] [Facebook](https://developers.facebook.com/docs/plugins/share-button)
    - [ ] [Tumblr](https://www.tumblr.com/buttons)
- Show nearby tweets on query.
- Show nearby foursquare venues on query.
- Toggle buttons SHOW/HIDE:
	- [x] bicycle route layer
	- [x] bike parking layer
	- [x] neighborhood boundaries layer
	- [x] public benches
- [x] Tooltip containing location metadata on click
- [x] MODAL: 'about this project', 'contact'
## Readding Custom Layers After Style Switch
- [Add custom layers on style switch, Mike Bostock](https://bl.ocks.org/ryanbaumann/7f9a353d0a1ae898ce4e30f336200483/96bea34be408290c161589dcebe26e8ccfa132d7)
- [Github issue on switching styles and retaining layers](https://github.com/mapbox/mapbox-gl-js/issues/3979)
## Manipulating `HTMLCollection` With `Array.from().forEach()`
- [Iterate over a nodeList or HTMLCollection](https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements/22754453)
- BONUS: checking if element exists in the DOM: `alert` `document.getElementById('bike-routes')` and if it doesn't exist the output is `null`.
## SVG Logo Placement
- [Detailed SVG guide](https://svgontheweb.com/)
- [include an SVG (hosted on github) in MarkDown](https://stackoverflow.com/questions/13808020/include-an-svg-hosted-on-github-in-markdown)
## GeoJSON Specs
- benches
	- features[0].layer.id === 'public-benches'
	- features[0].properties - Address, Street, X_Street, Typ
-  bike-parking
	- features[0].layer.id === 'bike-parking'
	- features[0].properties - Name ([string] street address), total_rack, circular(int)small(int), large(int), mini_hoop(int)
- bike-routes
	- features[0].layer.id === 'bike-routes'
	- features[0].properties - fromstreet, street, tostreet, onoffst (ON or OFF), lanecou(int), 	bikedir([int] 1 or 2), tf_facilit / ft_facilit ('Sharrow'=shared lane wittraffic 	'Standard'=marked bike-only lane, 'Protected Path'=separated from traffiwith divider, 	'Curbside', 'Greenway'
	- one-way or two-way
	- shared, dedicated, protected
	- has parking within block
- restaurants and bars
- museums
- business
- park
- landmark
## Features Wishlist
### Supercluster
- [Example with Google Maps and NYC Open Data](http://www1.nyc.gov/site/planning/data-maps/transportation/cityracks-map.page)
- [Custom icon for clusters in Mapbox GL Js](https://gis.stackexchange.com/questions/261987/custom-icon-for-clusters-in-mapbox-gl-js)
- [Mapbox GL JS - Cluster Property Aggregation with Supercluster](https://bl.ocks.org/ryanbaumann/01b2c7fc0ddb7b27f6a72217bd1461ad)
- [supercluster repo](https://github.com/mapbox/supercluster)
- [supercluster npm](https://www.npmjs.com/package/supercluster)
- [Turf.js](http://turfjs.org/getting-started/)
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
### History
* If the place has a Wikipedia entry, display link in popup
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
---
## Current Processes
### Building custom vector tiles
- Convert shapefile to GeoJSON using `ogr2ogr` tool from [GDAL](http://www.gdal.org/ogr2ogr.html) 
- Convert GeoJSON to mbtiles with `tippecanoe`
- [Mapshaper: preview shapefiles](http://mapshaper.org/)
- [Mapbox tutorial on command line conversion using Tippecanoe](https://blog.mapbox.com/visualizing-an-entire-citys-buildings-live-with-runtime-styling-453fe7e39ae6)
- [Tippecanoe](https://github.com/mapbox/tippecanoe)
- [Awesome Vector Tiles: Long list of MVT implementations](https://github.com/mapbox/awesome-vector-tiles)
- [Building a hosted static vector tile pipeline](https://geovation.github.io/build-your-own-static-vector-tile-pipeline)
- [Using Tilemaker to creat MVT vector tiles](http://gdunlop.github.io/Vector-tiles-remixed/)
- [Tilemaker](https://github.com/systemed/tilemaker): convert `.osm.pbf` to `.mvt`
- [Mapbox Vector Tiles Specifications](https://github.com/mapbox/vector-tile-spec/tree/master/2.1)
- [Another source: OpenMaptiles Custom Vector Tiles from GeoJSON or ShapeFile](https://openmaptiles.org/docs/generate/custom-vector-from-shapefile-geojson/)
- Bonus: [Instructions for making custom icon sprite sheet](https://github.com/mapbox/mapbox-gl-js/issues/822)
#### Mapbox GL: Adding Vector Tile Layers Using Custom Tilesets
- [Access Tilesets](https://www.mapbox.com/studio/tilesets/)
	- Bike parking tileset: chanversus.8frqupzv
	- Bike routes tileset: chanversus.b4y2ijie
	- Neighborhood tabulation area: chanversus.3eevjveq
- Create a new tileset on [Tilesets](https://www.mapbox.com/studio/tilesets/) page.
- Upload shapefile. This will take a minute or two to load.
- Use the Map ID to fill in `url` field in `addSource
- When using `addLayer` to build the tile layer in Mapbox GL, remember to use the Layer information found on [this page](https://www.mapbox.com/help/define-source-layer/) to enter the correct data in `source-layer` field
### Deep object reference
- When you are getting errors:
	- continue to test that each stage is there
	- the array of results has a nonzero lenfgth *the first exists, && second exists etc
	- `try { setting this variable } catch {}` - does not stop execution
	- `try{setting this variable} catch {console.log('error on line 51') }` logs out specific error
---
## Wishlist
### Fancy toggle buttons
- [Toggle buttons with on/off labels (Codepen)](https://codepen.io/christiannaths/pen/JoQBzY)
- [Add on/off text to toggle (Stackoverflow)](https://stackoverflow.com/questions/39846282/how-to-add-the-text-on-and-off-to-toggle-button)
- [ARIA notes on toggles](https://inclusive-components.design/toggle-button/)
## Geodata Management
- [Shapefile (GitHub)](https://github.com/mbostock/shapefile)
- [Streaming Shapefile, Bostock](https://bl.ocks.org/mbostock/2dd741099154a4da55a7db31fd96a892)
- [[Old] From Shapefile to GeoJSON, Vallandingham](http://vallandingham.me/shapefile_to_geojson.html)
## Animation
- [Pan map to location (OpenLayers)](https://openlayers.org/en/latest/examples/animation.html)
## Subway Transit Data by Google
- [NYC Subway Locator (Google)](https://developers.google.com/maps/solutions/store-locator/nyc-subway-locator)
	- [Repo](https://github.com/googlemaps/nyc-subway-station-locator)
	- [Codelab](https://codelabs.developers.google.com/codelabs/nyc-subway-station-locator/)
## Transitland Data by Mapzen
- [Animating Transitland Data](https://github.com/transitland/transitland-processing-animation)
- [Mapzen Assets Salvage List](https://mapzen.com/blog/migration/)
## General Cartography
- [2015 Overview of Digital Mapping Options](https://www.citylab.com/design/2015/06/who-owns-the-digital-map-of-the-world/396119/)
### TopoJSON
- [Command Line Cartography: TopoJSON, d3-geo, Bostock](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c)
- [TopoJSON Repo (GitHub)](https://github.com/topojson/topojson)
- [Inferring Topology From Geometry, Bostock](https://bost.ocks.org/mike/topology/)
- [Visvalingam’s Algorithm: Simplification of Polygons in Maps, Jason Davies](https://www.jasondavies.com/simplify/)
- [Line Simplification, Mike Bostock](https://bost.ocks.org/mike/simplify/)
---
## Backlog Issues
### Consuming Twitter and FourSquare APIs
[Blog Post on Twitter GET](http://elainechan.nyc/twitter-api/)
#### Collecting Twitter Data
* Write to file with .get tweets passing params
* Refine search to make sure we're getting 'valid' tweets
* Parse those results for data
* Within this time range, in this geo location, matching this query, how many tweets are there?
##### Tweepy Streaming Steps
1. Authenticate using four tokens.
2. Create a live streaming listener.
3. Save data in two formats simultaneously:
	a. Use `data` parameter and save as `JSON`.
	b. Use `status` parameter and save as `txt`.
##### Node Twitter
- [Node Twitter Repo](https://github.com/desmondmorris/node-twitter)
#### Collecting FourSquare Data
- [FourSquare API](https://developer.foursquare.com/)