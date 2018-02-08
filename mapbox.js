mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamRiMHp5NWMwMzdhMzNwbGFuOGdseWowIn0.Bbgi_5xpZpjBjYL8bZ__EA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chanversus/cjcwu6mu80jrv2rpgqf1myynv',
    center: [-74.0018, 40.7243],
    zoom: 10
});
// Adds map sources from Mapbox API
function addSources() {
    map.addSource('public-benches', {
        type: 'vector',
        url: 'mapbox://chanversus.bal31raj'
    });
}
// Adds featured layers
function addLayers() {
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
map.on('style.load', () => {
    addSources();
    addLayers();
    setPopups();
});