'use strict';

const Currency = {};

Currency.names = [];
Currency.rates = [];

function populateOne(){
  for(let prop in Currency.names.currencies){
    let menuNames = Currency.names.currencies;
    $('#currencyOne').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    $('#currencyTwo').append(`<option value="${prop}">${menuNames[prop]}</option>`);
  }
};

Currency.requestNames = function(callback) {
  $.get('http://apilayer.net/api/list?access_key=0e0b2c550a586eca8af82847a443b3ed')
    .then(data => Currency.names = data, err => console.error(err))
    .then(callback);
  };

Currency.requestNames(populateOne);
