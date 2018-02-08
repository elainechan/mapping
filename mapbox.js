mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamRiMHp5NWMwMzdhMzNwbGFuOGdseWowIn0.Bbgi_5xpZpjBjYL8bZ__EA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chanversus/cjcwu6mu80jrv2rpgqf1myynv',
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
    map.addSource('neighborhoods', {
        type: 'vector',
        //url: 'mapbox://chanversus.3eevjveq'
        url: 'mapbox://chanversus.djorti0h'
    });
}
// Adds featured layers
function addLayers() {
    var layers = map.getStyle().layers;
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
    });
    map.addLayer({
        'id': 'neighborhood-fills',
        'type': 'fill',
        'source': 'neighborhoods',
        'source-layer': 'ZillowNeighborhoods-NY-6auhot',
        'paint': {
            'fill-color': '#dc7633',
            'fill-opacity': 0.1
        }
    });
}

// Sets box that highlights area and shows neighborhood information on hover
function setNeighborhoodLabels() {
    map.on("mousemove", "neighborhood-fills", function(e) {
        let features = map.queryRenderedFeatures(e.point);
        document.getElementById('neighborhood-label').removeAttribute('hidden');
        document.getElementById('neighborhood-label').innerHTML = JSON.stringify(e.features[0].properties.Name, null, 2)
    });
    // Reset neighborhood-fills-hover layer's filter when the mouse leaves the layer.
    map.on("mouseleave", "neighborhood-fills", () => {
        document.getElementById('neighborhood-label').setAttribute('hidden', true);
    });
}
map.on('style.load', () => {
    addSources();
    addLayers();
    setNeighborhoodLabels();
});