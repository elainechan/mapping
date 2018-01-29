mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamE3cmJxdDMxMTU5MzJsbDdlM2d5OGFqIn0.Od7n9c17-jouVVYbaMWOsg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chanversus/cjcwu6mu80jrv2rpgqf1myynv',
    center: [-74.0018, 40.7243],
    zoom: 10
});

map.on('load', function () {
    map.addSource('bike-routes', {
        type: 'vector',
        url: 'mapbox://chanversus.b4y2ijie'
    });
    map.addLayer({
        'id': 'bike-routes',
        'type': 'line',
        'source': 'bike-routes',
        'source-layer': 'nyc-bike-routes-2e7vkb',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-color': '#877b59',
            'line-width': 5
        },
    });

    map.addSource('bike-parking', {
        type: 'vector',
        url: 'mapbox://chanversus.40louhe4'
    });
    map.addLayer({
        'id': 'bike-parking',
        'type': 'circle',
        'source': 'bike-parking',
        'source-layer': '2013-cityracks-shp-avydea',
    });
});
var toggleableLayerIds = [ 'bike-routes', 'bike-parking' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu1');
    layers.appendChild(link);
}

// Check radio button to show chosen style
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
function switchLayer(layer) {
    var layerValue = layer.target.value;
    map.setStyle(`mapbox://styles/chanversus/${layerValue}`);
}
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}
// Click map to show shaded hoods
map.on('click', () => {
	map.addSource('hoods', {
        'type': 'geojson',
        'data': './nyc-neighborhoods-tab.geojson'
	});
	map.addLayer({
        'id': 'hoods-layer',
        'type': 'fill',
        'source': 'hoods',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
	});
});
// Show popup on click (NOT WORKING)
map.on('click', 'hoods-layer', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
});

// Hover to show features in panel
map.on('mousemove', function (e) {
	var features = map.queryRenderedFeatures(e.point);
	
	if (JSON.stringify(features, null, 2).length > 1 && JSON.stringify(features, null, 2)[0].properties) {
		var name = JSON.stringify(features, null, 2)[0].properties.name;
		if (name) console.log(name);
	}
	document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
});

// Request Citibike data
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var citibike = JSON.parse(this.responseText);
        console.log(citibike.data.stations[0]);
    }
};
xmlhttp.open('GET', 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json', true);
xmlhttp.send();

shapefile.open('./nyc-bike-routes/nyc_bike_routes_20170707.shp', './nyc-bike-routes/nyc_bike_routes_20170707.dbf', null)
  .then(function(source) {
		var routes = source.read();
		console.log(routes.value);
  })
  .catch(function(error) {
    console.error(error.stack);
  });