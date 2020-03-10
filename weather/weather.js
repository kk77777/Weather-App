const request = require('request');
require('dotenv').config();
const weather = process.env.WEATHER_API_KEY;

var getWeather = (lat, long, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${weather}/${lat},${long}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback(error);
      } else {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    }
  );
};

module.exports.getWeather = getWeather;
