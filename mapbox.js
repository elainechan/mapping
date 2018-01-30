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
            'line-color': '#FF33F0',
            'line-width': 3
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
        'paint': {
            'circle-color': '#3342FF'
        }
    });

    map.addSource('neighborhoods', {
        type: 'vector',
        url: 'mapbox://chanversus.3eevjveq'
    });
    map.addLayer({
        'id': 'neighborhoods',
        'type': 'line',
        'source': 'neighborhoods',
        'source-layer': 'Neighborhood_Tabulation_Areas-095e1p',
        'paint': {
            'line-color': '#991126'
        }
    });

    map.addSource('public-benches', {
        type: 'vector',
        url: 'mapbox://chanversus.bal31raj'
    });
    map.addLayer({
        'id': 'public-benches',
        'type': 'symbol',
        'source': 'public-benches',
        'source-layer': '2016-citybench-401mrx',
        'layout': {
            'icon-image': 'triangle-15',
        }
    });
});
var toggleableLayerIds = [ 'bike-routes', 'bike-parking', 'neighborhoods', 'public-benches' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id.replace(/-/, ' ');

    link.onclick = function (e) {
        var clickedLayer = this.textContent.replace(/ /, '-');
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
map.on('click', function (e) {
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