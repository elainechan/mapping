# Project Notes
## TODO
- Toggle buttons SHOW/HIDE:
	- [x] bicycle route layer
	- [x] bike parking layer
	- [x] neighborhood boundaries layer
	- [x] public benches
- [x] Tooltip containing location metadata on click
- [x] MODAL: 'about this project', 'contact'

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

## Examples Used
- [Toggle buttons example (Codepen)](https://codepen.io/mallendeo/pen/eLIiG)
- [Get features on hover (Mapbox)](https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/)
- [Switch map style on radio button check (Mapbox)](https://www.mapbox.com/mapbox-gl-js/example/setstyle/)
---
## Wishlist
### Toggle buttons
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
#### Twitter data fetch
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