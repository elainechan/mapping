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

    map.addSource('hood-boundaries', {
        type: 'vector',
        url: 'mapbox://chanversus.3eevjveq'
    });
    map.addLayer({
        'id': 'hood-boundaries',
        'type': 'line',
        'source': 'hood-boundaries',
        'source-layer': 'Neighborhood_Tabulation_Areas-095e1p',
    });
});
var toggleableLayerIds = [ 'bike-routes', 'bike-parking', 'hood-boundaries' ];

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

// Hover to show features in panel
map.on('mousemove', function (e) {
	var features = map.queryRenderedFeatures(e.point);
	
	if (JSON.stringify(features, null, 2).length > 1 && JSON.stringify(features, null, 2)[0].properties) {
		var name = JSON.stringify(features, null, 2)[0].properties.name;
		if (name) console.log(name);
	}
	document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
});

// Request Citibike data (WORKS)
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var citibike = JSON.parse(this.responseText);
        console.log(citibike.data.stations[0]);
    }
};
xmlhttp.open('GET', 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json', true);
xmlhttp.send();