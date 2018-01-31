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
        'type': 'symbol',
        'source': 'bike-parking',
        'source-layer': '2013-cityracks-shp-avydea',
        'layout': {
            'icon-image': 'bicycle-15',
            'icon-size': 1.5
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
    map.addSource();
    map.addLayer();
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
// Click to show popup with information about the venue
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point);
    // Places with icons
    if (features[0].layer.type === 'symbol') {
        map.on('mouseover', function() {
            map.getCanvas().style.cursor = 'pointer';
        });
        // Places with 'names' key in lowercase
        if (features[0].properties.name) {
            // Rail stations
            if (features[0].layer.id === 'rail-label-minor'
                || features[0].layer.id === 'rail-label-major') {
                let type = features[0].properties.network.replace(/-/g, ' ');
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>${features[0].properties.name}</h5><p>${type} station</p>`)
                .addTo(map);
            } else {
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>${features[0].properties.name}</h5><p>${features[0].properties.type}</p>`)    
                .addTo(map);
            }
        } else if (features[0].properties.Name) { // Places with 'Names' key capitalized
            if (features[0].layer.id === 'bike-parking') { // Bike parking is notable for this
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>Bicycle parking</h5><p>${features[0].properties.Name}</p><p>Total racks: ${features[0].properties.total_rack}</p>`).addTo(map);
            } else { // Other places 
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>${features[0].properties.Name}</h5><p>${features[0].properties.Name}</p>`).addTo(map);
            }
        } else if (features[0].layer.id === 'public-benches') { // Public benches has no 'name' field
                new mapboxgl.Popup()
                .setLngLat(features[0].geometry.coordinates)
                .setHTML(`<h5>Public bench</h5><p>${features[0].properties.Address}, between ${features[0].properties.X_Street}</p>`).addTo(map);
        } else {
            new mapboxgl.Popup()
            .setLngLat(features[0].geometry.coordinates)
            .setHTML(`<h5>${features[0].properties.type}</h5>`).addTo(map);
        } 
    }
    /* Meant to supply bike route information but breaks app */ 
    /* else if (features[0].layer.id === 'bike-routes') {
        map.on('mouseover', function() {
            map.getCanvas().style.cursor = 'pointer';
        });
        var routeType = 'Bicycle path';
        var routeDescription = 'intended for bicycle traffic';
        switch(features[0].properties.ft_facilit || features[0].properties.tf_facilit) {
            case 'Sharrow':
                routeType = 'Shared path';
                routeDescription = 'intended for shared use with vehicle traffic; vehicles are allowed to drive on the parts of the road where bicycles travel';
                break;
            case 'Standard':
                routeType = 'Dedicated path';
                routeDescription = 'intended for bicycles only';
                break;
            case 'Curbside':
                routeType = 'Curbside path';
                routeDescription = 'next to a curb, near pedestrians';
                break;
            case 'Protected Path':
                routeType = 'Protected path';
                routeDescription = 'separated from vehicle traffic with barriers or extra space';
                break;
            case 'Greenway':
                routeType = 'Greenway';
                routeDescription = 'along a strip of undeveloped land set aside for recreational use, e.g. waterfront, parkway, and nature trails';
                break;
            default:
                routeType = 'Bicycle path';
                routeDescription = 'intended for bicycle traffic';
                break;
        } 
        new mapboxgl.Popup()
            .setLngLat(features[0].geometry.coordinates)
            .setHTML(`<h5>Bike route</h5><p><em>${routeType}</em>, ${routeDescription}</p>`).addTo(map);
    } 
    */
	document.getElementById('features').innerHTML = JSON.stringify(features, null, 2)
});