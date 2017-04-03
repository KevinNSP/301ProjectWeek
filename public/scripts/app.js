'use strict';

Currency.all = [];

Currency.requestData = function(callback) {
  $.get('http://apilayer.net/api/live?access_key=0e0b2c550a586eca8af82847a443b3ed')
    .then(data => Currency.all = data, err => console.error(err));
    .then(callback);
  };

console.log(Currency.all);
