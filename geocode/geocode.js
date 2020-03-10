const request = require('request');
require('dotenv').config();
const GEO = process.env.GEO_API_KEY;
const geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${GEO}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback(error);
      } else {
        callback(undefined, {
          address: body.features[0].place_name,
          latitude: body.features[0].geometry.coordinates[1],
          longitude: body.features[0].geometry.coordinates[0]
        });
      }
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;
