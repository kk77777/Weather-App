const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const yargs = require('yargs');
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

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    console.log(results.latitude);

    weather.getWeather(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
        } else {
          console.log(
            `It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`
          );
        }
      }
    );
  }
});
// console.log(address);

// d60c50a5cd24bd9312a48f2a0145c829
