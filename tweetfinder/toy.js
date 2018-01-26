const cities = [
    {
        "city": "New York", 
        "growth_from_2000_to_2013": "4.8%", 
        "latitude": 40.7127837, 
        "longitude": -74.0059413, 
        "population": "8405837", 
        "rank": "1", 
        "state": "New York"
    }, 
    {
        "city": "Los Angeles", 
        "growth_from_2000_to_2013": "4.8%", 
        "latitude": 34.0522342, 
        "longitude": -118.2436849, 
        "population": "3884307", 
        "rank": "2", 
        "state": "California"
    }, 
    {
        "city": "Chicago", 
        "growth_from_2000_to_2013": "-6.1%", 
        "latitude": 41.8781136, 
        "longitude": -87.6297982, 
        "population": "2718782", 
        "rank": "3", 
        "state": "Illinois"
    }, 
    {
        "city": "Houston", 
        "growth_from_2000_to_2013": "11.0%", 
        "latitude": 29.7604267, 
        "longitude": -95.3698028, 
        "population": "2195914", 
        "rank": "4", 
        "state": "Texas"
    }, 
    {
        "city": "Philadelphia", 
        "growth_from_2000_to_2013": "2.6%", 
        "latitude": 39.9525839, 
        "longitude": -75.1652215, 
        "population": "1553165", 
        "rank": "5", 
        "state": "Pennsylvania"
    }];

var obj = {
	city: '',
	geocode: ''
}

function printCity() { 
	console.log(`${obj.city}: ${obj.geocode}`);
}
var currIndex = 0;
function timeConsoleLog() {
    setTimeout(function() {
        let la = cities[currIndex].latitude;
        let lo = cities[currIndex].longitude;
        let currCity = cities[currIndex].city;
        obj.city = `${currCity}`;
        obj.geocode = `${la},${lo}`;
        printCity();
        currIndex++;
        if(currIndex < 3) {
            timeConsoleLog();
        }
    }, 3000);
        
}

const tweetText = require('./tweet-text.json');
const d3 = require('d3');
const converter = require('json-2-csv');
const fs = require('fs');

var options = {
    delimiter : {
        wrap: '"'
    }
};
var convert = converter.json2csv(tweetText, (data, err) => {
    if (err) throw err;
    fs.appendFile('tweet-text.csv', data, err => {
        if (err) throw err;
    });
}, options);

var text = [
	{
		"city": "New York",
		"tweets": ["alpha", "bravo"]
	},
	{
		"city": "Los Angeles",
		"tweets": ["charlie", "delta"]
	},
	{
		"city": "Chicago",
		"tweets": ["echo", "foxtrot"]
	}
];

console.log(text[0].city);
console.log(text[0].tweets);