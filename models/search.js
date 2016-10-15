var NodeGeocoder = require('node-geocoder');
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '07109bffb1d08bf7d265c68183e8a2491d8091c3'
});

require('dotenv').config();


exports.getSearch = function (callback, query) {

};

exports.getStream = function(callback, query, res) {

};

exports.getLocationStream = function (callback, query, response) {


};
