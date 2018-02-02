# Bleachers: Code Reserves
## Data Debugging Panel
- Visualizes textual data in side panel on point click
- Use this for viewing metadata to debug and design functions
- Insert at the end of `map.on('click')`
```javascript
document.getElementById('features').innerHTML = JSON.stringify(features, null, 2)
```
- Add to HTML
```html
<pre id='features'></pre><!--feature-popup-->
<style>
#features {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    overflow: auto;
    background: rgba(255, 255, 255, 0.8);
}
</style>
```
## Set cursor on hover
- This works, but because the app is extremely slow I've taken it out.
```javascript
function setCursorPointer() {
    // Hover over symbols to change cursor to pointer
    map.on('mouseover', function(e) {
        let features = map.queryRenderedFeatures(e.point);
        // Places with icons are clickable
        if (features[0].layer.type === 'symbol' && features[0].geometry.type === 'Point') {
            map.getCanvas().style.cursor = 'pointer';
        }
    });
}
```
## Citibike Data Request
- Works but not implemented yet
```javascript
var citibike = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "station_id": "",
                "name": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": []
            }
        }
    ]
};
var featureObj = {
    "type": "Feature",
    "properties": {
        "station_id": "",
        "name": ""
    },
    "geometry": {
        "type": "Point",
        "coordinates": []
    }
}
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var citibikeStations = JSON.parse(this.responseText);
        citibikeStations.data.stations.forEach(function(i, data) {
            var coordinates = [];
            coordinates.push(data.lon);
            coordinates.push(data.lat);
        });
    }
};
xmlhttp.open('GET', 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json', true);
xmlhttp.send();
```
```javascript
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var citibikeStatus = JSON.parse(this.responseText);
        console.log(citibikeStatus.data.stations[0]);
    }
};
xmlhttp.open('GET', 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json', true);
xmlhttp.send();
```
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