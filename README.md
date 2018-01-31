# NYC Map For Cyclist and Pedestrians
A map containing granular local information not normally found in commercial maps.
## Current Features
- Displays on load, toggle on button click:
	- [x] Bike parking
	- [x] Bike routes
	- [x] Public benches
	- [x] Neighborhood boundaries
- [x] Displays popup with location information on click
- See [notes](https://github.com/elainechan/mapping/blob/master/notes.md) for copious details and sources.
## Main Tools
- [NYC Open Data](http://www.nyc.gov/html/dot/html/about/datafeeds.shtml#bikes)
- [Mapbox GL JS API](https://www.mapbox.com/mapbox-gl-js/api/)
## Process
- Data is downloaded manually from NYC Open Data and uploaded to Mapbox Studio to create custom vector tiles.
- The code uses Mapbox API to render a map and retrieve the custom vector tiles as layers upon the map.
- 
## Examples Used
- [Get features on hover (Mapbox)](https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/)
- [Show and hide layers (Mapbox)](https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/)
- [Bootstrap modal plugin](https://www.w3schools.com/bootstrap/bootstrap_modal.asp)