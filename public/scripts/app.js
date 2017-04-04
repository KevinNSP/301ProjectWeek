'use strict';

const Currency = {};
const Rates = {};
let rateyRates = [];
let moneyNames = [];
let threeCodes = [];
// Currency.names = [];
// Rates.names = [];

function populateNames(){
  for(let prop in Currency.names.currencies){
    let menuNames = Currency.names.currencies;
    $('#currencyOne').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    $('#currencyTwo').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    threeCodes.push(prop);
    moneyNames.push(menuNames[prop]);
  }
};

function populateRates(){
  for(let prop in Rates.names.quotes){
    let menuNames = Rates.names.quotes;
    // $('#currencyOne').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    // $('#currencyTwo').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    rateyRates.push(menuNames[prop]);
  }
  let newRates = rateyRates.map(rate => {
    return {
      rate: rate
    }
  })
  console.log('these are new rates ', newRates);
};

Rates.requestRates = function(callback) {
  $.get('http://apilayer.net/api/live?access_key=0e0b2c550a586eca8af82847a443b3ed')
    .then(data => Rates.names = data, err => console.error(err))
    .then(data => {

    })
    .then(callback);
};

Currency.requestNames = function(callback) {
  $.get('http://apilayer.net/api/list?access_key=0e0b2c550a586eca8af82847a443b3ed')
    .then(data => Currency.names = data, err => console.error(err))
    .then(callback);
};

Rates.requestRates(populateRates);
Currency.requestNames(populateNames);
