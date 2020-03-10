require('dotenv').config();
const GEO = process.env.GEO_API_KEY;
const weather = process.env.WEATHER_API_KEY;

const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for ',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${GEO}`;

axios
  .get(geocodeUrl)
  .then(response => {
    console.log(response.data.features[0].place_name);
    var lat = response.data.features[0].geometry.coordinates[1];
    var long = response.data.features[0].geometry.coordinates[0];
    var weatherUrl = `https://api.darksky.net/forecast/${weather}/${lat},${long}`;
    return axios.get(weatherUrl);
  })
  .then(response => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It's currently ${temperature} but it feels's like ${apparentTemperature}`
    );
  })
  .catch(e => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    }
  });
