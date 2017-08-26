const axios = require('axios');

const apiKey = 'b621b85fbfb44d747a70c7315f981a72';
const apiUrl = 'https://api.darksky.net/forecast/';

const getWeather = (options = {}) => {
  const lat = options.lat;
  const lng = options.lng;
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl + apiKey}/${lat},${lng}`)
      .then(response => {
        resolve(response.data.currently);
      }).catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  getWeather
};
