'use strict';

const Currency = {};

Currency.names = [];
Currency.rates = [];

Currency.requestNames = function(callback) {
  $.get(`http://apilayer.net/api/list?access_key=${process.env.APP_TOKEN}`)
    .then(data => Currency.names = data, err => console.error(err))
    .then(callback);
  };

Currency.requestRates = function(callback) {
  $.get(`http://apilayer.net/api/live?access_key=${process.env.APP_TOKEN}`)
    .then(data => Currency.rates = data, err => console.error(err))
    .then(callback);
};

Currency.requestRates();
Currency.requestNames();
