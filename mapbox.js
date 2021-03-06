mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamRiMHp5NWMwMzdhMzNwbGFuOGdseWowIn0.Bbgi_5xpZpjBjYL8bZ__EA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chanversus/cjd4xt7zr5on82rmkz4l10n2r',
    center: [-74.0018, 40.7243],
    zoom: 10
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
}
// Adds featured layers
function addLayers() {
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
}
const LAYERS = [
    {
        'name': 'bike-routes',
        'items': ['bike-routes']
    },
    {
        'name':'bike-parking',
        'items': ['bike-parking']
    },
    {
        'name': 'public-benches',
        'items': ['public-benches']
    }
];
function hideLayer(layerName) {
    layerName[0].items.forEach((layerItem) => {
        map.setLayoutProperty(layerItem, 'visibility', 'none');
    }); 
}
function showLayer(layerName) {
    layerName[0].items.forEach((layerItem) => {
        map.setLayoutProperty(layerItem, 'visibility', 'visible');
    });
}
// Creates toggle buttons
function createToggleButtons() {
    const layers = document.getElementById('toggle-features');
    LAYERS.forEach((layer) => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'active toggle-layer';
        link.id = layer.name;
        link.textContent = layer.name.replace(/-/, ' '); // Remove hyphen to display in browser
        layers.appendChild(link);
    });
}
// Remembers state of toggled feature layers
function retainToggleLayersState() {
    let layers = document.getElementById('toggle-features');
    let links = layers.getElementsByTagName('a');
    Array.from(links).forEach((link) => {
        let clickedName = link.textContent.replace(/ /, '-'); // Adds hyphen for manipulation
        let chosenLayer = LAYERS.filter((obj) => {
            return obj.name === clickedName;
        }); // Toggle features
        if (link.classList.contains('active')) { // If button is dark
            showLayer(chosenLayer);
        } else {
            hideLayer(chosenLayer);
        }
    });
}
// Sets event handler for feature layer buttons
function setHandleToggleButtonClick() {
    let layers = document.getElementById('toggle-features');
    let links = layers.getElementsByTagName('a');
    Array.from(links).forEach((link) => {
        link.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var clickedName = this.textContent.replace(/ /, '-'); // Re-add hyphen to manipulate
            let chosenLayer = LAYERS.filter((obj) => {
                return obj.name === clickedName;
            }); // Toggle features
            if (document.getElementById(clickedName).classList.contains('active')) { // If 'on'
                document.getElementById(clickedName).classList.remove('active');
                hideLayer(chosenLayer);
            } else { // If 'off'
                document.getElementById(clickedName).classList.add('active');
                showLayer(chosenLayer);
            }
        }
    });
}
// Sets toggle layers
function setLayerToggling() {
    if (!document.getElementsByClassName('toggle-layer').length) { // If buttons don't exist, create
        createToggleButtons();
    } else { // If buttons exist, set layers according to buttons state
        retainToggleLayersState();
    }
    setHandleToggleButtonClick();
}
// Sets popup box that shows location information on click
function setPopups() {
    // Click to show popup with information about the venue
    map.on('click', (e) => {
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
    const STYLES = {
        'north-star': 'mapbox://styles/chanversus/cjd5jjweu68u92rmkc112hkpb',
        'ice-cream': 'mapbox://styles/chanversus/cjd5rpbad6grc2rp46esjmy3o',
        'light': 'mapbox://styles/mapbox/light-v9',
        'scenic': 'mapbox://styles/chanversus/cjd4xt7zr5on82rmkz4l10n2r',
        'day': 'mapbox://styles/chanversus/cjcwu6mu80jrv2rpgqf1myynv',
        'streets': 'mapbox://styles/mapbox/streets-v10',
        'standard': 'mapbox://styles/chanversus/cjcwh8yij07bu2smyb1v45iza',
        'navigate': 'mapbox://styles/chanversus/cjcwu66ti0jt72rlhflrogw4o'
    }
    let layerList = document.getElementById('style-menu');
    let inputs = layerList.getElementsByTagName('input');
    Array.from(inputs).forEach((item) => { // Use `from` to iterate element
        item.onclick = () => {
            map.setStyle(STYLES[item.id]);
        }
    });
}
map.on('style.load', () => {
    addSources();
    addLayers();
    setLayerToggling();
    setPopups();
    setStyleSwitch();
});