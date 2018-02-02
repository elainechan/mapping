// THIS CODE WORKS BUT IS NOT CURRENTLY IN USE
// The idea was to provide activity information by taking query input and location coordinate inputs and providing a list of suggested venues.
const request = require('request');
const config = require('./foursquare-config.js');

request({
	url: 'https://api.foursquare.com/v2/venues/explore',
	method: 'GET',
	qs: {
	  client_id: config.client_id,
	  client_secret: config.client_secret,
	  ll: '40.7243,-74.0018',
	  query: 'coffee',
	  v: '20170801',
	  limit: 1
	}
  }, function(err, res, body) {
	if (err) {
	  console.error(err);
	} else {
	  console.log(body);
	}
  });
  