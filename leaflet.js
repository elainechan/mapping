mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamE3cmJxdDMxMTU5MzJsbDdlM2d5OGFqIn0Od7n9c17-jouVVYbaMWOsg';

var mymap = L.map('map').setView([40.7243, -74.0018], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery© <a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
   id: 'mapbox.streets',
accessToken:'pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamE3cmJxdDMxMTU5MzJsbDdlM2d5OGFqIn0.Od7n9c17-jouVVYbaMWOsg'
}).addTo(mymap);
/*
var district_boundary = new L.geoJson();
district_boundary.addTo(mymap);
$.ajax({
	dataType: "json",
	url: "./nyc-neighborhoods-tab.geojson",
	success: function(data) {
		//var boundaryData = JSON.parse(data);
		//console.log(boudaryData);
    	$(data.features).each(function(key, data) {
        	district_boundary.addData(data);
    });
}
}).catch(function(error) {
    console.error(error.stack);
  });
*/
var district_boundary = new L.geoJson();
district_boundary.addTo(mymap);
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var hoods = JSON.parse(this.responseText);
		console.log(hoods.features[0].properties.ntaname);
    }
};
xmlhttp.open('GET', './nyc-neighborhoods-tab.geojson', true);
xmlhttp.send();