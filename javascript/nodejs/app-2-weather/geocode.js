const axios = require('axios');

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`).then(results => {
      if (results.data.status !== 'OK') {
        reject('Address not found');
        return;
      }
      resolve({
        address: results.data.results[0].formatted_address,
        lat: results.data.results[0].geometry.location.lat,
        lng: results.data.results[0].geometry.location.lng
      });
    }).catch(error => {
      reject(error);
    });
  });
};

module.exports = {
  geocodeAddress
};
