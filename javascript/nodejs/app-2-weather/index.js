const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather');

const argv = yargs.options({
  address: {
    alias: 'a',
    describe: 'Address to fetch weather for',
    string: true,
    default: 'London'
  }
}).help().alias('help', 'h').argv;

const encodedAddress = encodeURIComponent(argv.address);

console.log(encodedAddress);

const farToCel = (f) => {
  return ((f - 32) / 1.8).toFixed(2);
};

geocode.geocodeAddress(encodedAddress)
  .then(results => {
    // console.log(JSON.stringify(results, undefined, 2));
    console.log(results.address);
    return weather.getWeather(results);
  })
  .then(weatherResults => {
    // console.log(JSON.stringify(weatherResults, undefined, 2));
    console.log(`Temperature °F/°C: ${weatherResults.temperature}/${farToCel(weatherResults.temperature)} and it feels like: ${weatherResults.apparentTemperature}/${farToCel(weatherResults.apparentTemperature)}`);
  })
  .catch(error => {
    if (error.message) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  });
