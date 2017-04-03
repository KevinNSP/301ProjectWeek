'use strict';

const Currency = {};

Currency.names = [];
Currency.rates = [];

Currency.requestNames = function(callback) {
  $.get('http://apilayer.net/api/list?access_key=0e0b2c550a586eca8af82847a443b3ed')
    .then(data => Currency.names = data, err => console.error(err))
    .then(callback);
  };

  Currency.requestRates = function(callback) {
    $.get('http://apilayer.net/api/live?access_key=0e0b2c550a586eca8af82847a443b3ed')
      .then(data => Currency.rates = data, err => console.error(err))
      .then(callback);
    };

// $('#results').append(Currency.all)
Currency.requestRates();
Currency.requestNames();
