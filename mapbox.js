mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamE3cmJxdDMxMTU5MzJsbDdlM2d5OGFqIn0.Od7n9c17-jouVVYbaMWOsg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chanversus/cjcwu6mu80jrv2rpgqf1myynv',
    center: [-74.0018, 40.7243],
    zoom: 10
});

map.on('style.load', () => {
    addSources();
    loadLayers();
    setToggleLayers();
    setNeighborhoodHighlight();
    setPopups();
    setStyleSwitch();
});
// Adds map sources from Mapbox API
function addSources() {
    map.addSource('bike-routes', {
        type: 'vector',
        url: 'mapbox://chanversus.b4y2ijie'
    });
    map.addSource('bike-parking', {
        type: 'vector',
        url: 'mapbox://chanversus.40louhe4'
    });
    map.addSource('public-benches', {
        type: 'vector',
        url: 'mapbox://chanversus.bal31raj'
    });
    map.addSource('neighborhoods', {
        type: 'vector',
        //url: 'mapbox://chanversus.3eevjveq'
        url: 'mapbox://chanversus.djorti0h'
    });
}
// Adds featured layers
function loadLayers() {
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
    map.addLayer({
        'id': 'public-benches',
        'type': 'symbol',
        'source': 'public-benches',
        'source-layer': '2016-citybench-401mrx',
        'layout': {
            'icon-image': 'triangle-11',
        }
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
}
// Sets toggle buttons to show/hide layers
function setToggleLayers() {
    // Prepares data for layer toggling
    if (document.getElementById('bike-routes') === null) {
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
        for (var i = 0; i < toggleableLayers.length; i++) {
            var layer = toggleableLayers[i];
            var link = document.createElement('a');
            link.href = '#';
            link.className = 'active toggle-layer';
            link.id = layer.name;
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
            var layers = document.getElementById('toggle-features');
            layers.appendChild(link);
        }
    }
}
// Sets box that highlights area and shows neighborhood information on hover
function setNeighborhoodHighlight() {
    // Highlights neighborhood polygon on hover
    if (document.getElementById('neighborhoods').className === 'active') {
        map.on("mousemove", "neighborhood-fills", function(e) {
            let features = map.queryRenderedFeatures(e.point);
            map.setFilter("neighborhood-fills-hover", ["==", "Name", e.features[0].properties.Name]);
            document.getElementById('neighborhood-label').removeAttribute('hidden');
            document.getElementById('neighborhood-label').innerHTML = JSON.stringify(e.features[0].properties.Name, null, 2)
        });
        // Reset neighborhood-fills-hover layer's filter when the mouse leaves the layer.
        map.on("mouseleave", "neighborhood-fills", function() {
            map.setFilter("neighborhood-fills-hover", ["==", "name", ""]);
            document.getElementById('neighborhood-label').setAttribute('hidden', true);
        });
    }
}
// Sets popup box that shows location information on click
function setPopups() {
    // Click to show popup with information about the venue
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
}
// Sets buttons for switching between map styles
function setStyleSwitch() {
    var styles = {
        'day': 'mapbox://styles/chanversus/cjcwu6mu80jrv2rpgqf1myynv',
        'night': 'mapbox://styles/mapbox/navigation-preview-night-v2',
        'streets': 'mapbox://styles/mapbox/streets-v10',
        'light': 'mapbox://styles/mapbox/light-v9',
        'dark': 'mapbox://styles/mapbox/dark-v9',
        'scenic': 'mapbox://styles/chanversus/cjd4xt7zr5on82rmkz4l10n2r',
        'standard': 'mapbox://styles/chanversus/cjcwh8yij07bu2smyb1v45iza',
        'navigate': 'mapbox://styles/chanversus/cjcwu66ti0jt72rlhflrogw4o',
        'nav-night': 'mapbox://styles/mapbox/navigation-guidance-night-v2',
        'north-star': 'mapbox://styles/chanversus/cjd5jjweu68u92rmkc112hkpb',
        'satellite': 'mapbox://styles/mapbox/satellite-v9',
        'satellite-streets': 'mapbox://styles/mapbox/satellite-streets-v10',
    }
    var layerList = document.getElementById('style-menu');
    var inputs = layerList.getElementsByTagName('input');
    function switchLayer(name) {
        map.setStyle(styles[name]);
    }
    Array.from(inputs).forEach(function(item) {
        item.onclick = () => {
            //alert()
            switchLayer(item.id);
        }
    });
}