mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamE3cmJxdDMxMTU5MzJsbDdlM2d5OGFqIn0.Od7n9c17-jouVVYbaMWOsg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chanversus/cjd4xt7zr5on82rmkz4l10n2r',
    //style: 'mapbox://styles/mapbox/streets-v10',
    center: [-74.0018, 40.7243],
    zoom: 10
});

map.on('load', function () {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    // Ensure featured icons display visibly above other layers
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map.addSource('bike-routes', {
        type: 'vector',
        url: 'mapbox://chanversus.b4y2ijie'
    });
    map.addLayer({
        'id': 'bike-routes',
        'type': 'line',
        'source': 'bike-routes',
        'source-layer': 'nyc-bike-routes-2e7vkb',
        'paint': {
            'line-color': '#0000ff',
            'line-width': 3.5,
            'line-opacity': 1
        },
    });
    map.addSource('bike-parking', {
        type: 'vector',
        url: 'mapbox://chanversus.40louhe4'
    });
    map.addLayer({
        'id': 'bike-parking',
        'type': 'symbol',
        'source': 'bike-parking',
        'source-layer': '2013-cityracks-shp-avydea',
        'layout': {
            'icon-image': 'bicycle-11',
            'icon-size': 1.5
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
            'icon-image': 'triangle-11',
        }
    });
    map.addSource('neighborhoods', {
        type: 'vector',
        //url: 'mapbox://chanversus.3eevjveq'
        url: 'mapbox://chanversus.djorti0h'
    });
    map.addLayer({
        'id': 'neighborhood-boundaries',
        'type': 'line',
        'source': 'neighborhoods',
        //'source-layer': 'Neighborhood_Tabulation_Areas-095e1p',
        'source-layer': 'ZillowNeighborhoods-NY-6auhot',
        'paint': {
            'line-color': '#000000',
            'line-width': 1.75
        }
    }, firstSymbolId);
    map.addLayer({
        'id': 'neighborhood-fills',
        'type': 'fill',
        'source': 'neighborhoods',
        'source-layer': 'ZillowNeighborhoods-NY-6auhot',
        'paint': {
            'fill-color': '#dc7633',
            'fill-opacity': 0.1
        }
    },firstSymbolId);
    map.addLayer({
        'id': 'neighborhood-fills-hover',
        'type': 'fill',
        'source': 'neighborhoods',
        'source-layer': 'ZillowNeighborhoods-NY-6auhot',
        'paint': {
            'fill-color': '#e59866',
            'fill-opacity': 0.4
        },
        "filter": ["==", "Name", ""]
    },firstSymbolId);
});
// Prepares data for layer toggling
var toggleableLayers = [
    {
        'name': 'bike-routes',
        'items': ['bike-routes']
    },
    {
        'name':'bike-parking',
        'items': ['bike-parking']
    },
    {
        'name': 'neighborhoods',
        'items': ['neighborhood-boundaries', 'neighborhood-fills', 'neighborhood-fills-hover'],
    },
    {
        'name': 'public-benches',
        'items': ['public-benches']
    }
];
// 
for (var i = 0; i < toggleableLayers.length; i++) {
    var layer = toggleableLayers[i];
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.setAttribute('id', `${layer.name}`);
    link.textContent = layer.name.replace(/-/, ' '); // Display in browser with hyphen removed
    link.onclick = function (e) {
        var clickedLayerName = this.textContent.replace(/ /, '-'); // Re-add hyphen to manipulate
        e.preventDefault();
        e.stopPropagation();
        var chosenLayer = toggleableLayers.filter((obj) => {
            return obj.name === clickedLayerName;
        }); // Toggle features
        if (document.getElementById(clickedLayerName).className === 'active') { // Feature is 'on'
            document.getElementById(clickedLayerName).className = '';
            chosenLayer[0].items.forEach((layerItem) => {
                map.setLayoutProperty(layerItem, 'visibility', 'none');
            }); 
        } else {
            document.getElementById(clickedLayerName).className = 'active';
            chosenLayer[0].items.forEach((layerItem) => {
                map.setLayoutProperty(layerItem, 'visibility', 'visible');
            });
        }
    }
    var layers = document.getElementById('menu1');
    layers.appendChild(link);
}
// Highlights neighborhood polygon on hover
if (document.getElementById('neighborhoods').className === 'active') {
    map.on("mousemove", "neighborhood-fills", function(e) {
        map.setFilter("neighborhood-fills-hover", ["==", "Name", e.features[0].properties.Name]);
    });
    // Reset neighborhood-fills-hover layer's filter when the mouse leaves the layer.
    map.on("mouseleave", "neighborhood-fills", function() {
        map.setFilter("neighborhood-fills-hover", ["==", "name", ""]);
    });
}
// Hover to show features in panel
// Click to show popup with information about the venue
map.on('click', function(e) {
    let features = map.queryRenderedFeatures(e.point);
    document.getElementById('features').innerHTML = JSON.stringify(features, null, 2)
});
map.on('mouseover', function(e) {
    let features = map.queryRenderedFeatures(e.point);
    // Places with icons are clickable
    if (features[0].layer.type === 'symbol' && features[0].geometry.type === 'Point') {
        map.getCanvas().style.cursor = 'pointer';
    }
});

map.on('click', function(e) {
    let features = map.queryRenderedFeatures(e.point);
    if (features[0].layer.type === 'symbol' && features[0].geometry.type === 'Point') {
        // Places with 'names' key in lowercase
        if (features[0].properties.name) {
            // Rail stations
            if (features[0].layer.id === 'rail-label') {
                let network = features[0].properties.network.replace(/-/g, ' ');
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>${features[0].properties.name}</h5><p>${network} station</p>`)
                .addTo(map);
            } else if (features[0].properties.name_en) { // Multilingual listing
                if (features[0].properties.type) {
                    new mapboxgl.Popup()
                    .setLngLat(features[0].geometry.coordinates)
                    .setHTML(`<h5>${features[0].properties.name_en}</h5><p>${features[0].properties.type}</p>`)    
                    .addTo(map);
                } else {
                    new mapboxgl.Popup()
                    .setLngLat(features[0].geometry.coordinates)
                    .setHTML(`<h5>${features[0].properties.name_en}</h5>`)    
                    .addTo(map);
                }
            } else {
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>${features[0].properties.name}</h5><p>${features[0].properties.type}</p>`)    
                .addTo(map);
            }
        } else if (features[0].properties.Name) { // Places with 'Name' key capitalized
            if (features[0].layer.id === 'bike-parking') { // Bike parking is notable for this
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>Bicycle parking</h5><p>${features[0].properties.Name}</p><p>Total racks: ${features[0].properties.total_rack}</p>`)
                .addTo(map);
            } else if (features[0].properties.type) { // Other places 
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>${features[0].properties.Name}</h5><p>${features[0].properties.type}</p>`)
                .addTo(map);
            }
        } else if (features[0].layer.id === 'public-benches') { // Benches have no 'name' field
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>Public bench</h5><p>${features[0].properties.Address}, between ${features[0].properties.X_Street}</p><p>Type: ${features[0].properties.Type}</p>`)
                .addTo(map);
        } else { // no name
                new mapboxgl.Popup()
                .setLngLat(features[0].properties.type)
                .setHTML(`<p>${features[0].properties.type}</p>`)
                .addTo(map);
        }
    }
});
