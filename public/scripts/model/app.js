'use strict';

const Currency = {};
const Rates = {};
let rateyRates = [];
let moneyNames = [];
let threeCodes = [];
let allData = [];

function Data(name, code) {
  this.name = name;
  this.code = code;
};

Data.prototype.addRate = function (rate) {
  this.rate = rate;
};

function currencyVal(filterId){
  let currencyName = $(filterId).change(function() {
    return $(this).val();
  });
  return allData.filter(function(obj){
    return obj.code === currencyName;
  });
}

// function secondCurrency(){
//   let curencyTwoName = $('#currencyTwo').change(function() {
//     return $(this).val();
//   });
//   return allData.filter(function(obj){
//     return obj.name === currencyTwoName;
//   });
// }

function populateFilters(){
  for (var i = 0; i < allData.length; i++) {
    console.log('a filter is being populated');
    $('#currencyOne').append(`<option value = "${allData[i].rate}">${allData[i].name}</option>`);
    $('#currencyTwo').append(`<option value = "${allData[i].rate}">${allData[i].name}</option>`);
  }
}

function populateNames(){
  for(let prop in Currency.names.currencies){
    let menuNames = Currency.names.currencies;
    // $('#currencyOne').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    // $('#currencyTwo').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    threeCodes.push(prop);
    moneyNames.push(menuNames[prop]);
  }
  // console.log('populate filters');
  // populateFilters();
};

function populateRates(){
  for(let prop in Rates.names.quotes){
    let menuNames = Rates.names.quotes;
    // $('#currencyOne').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    // $('#currencyTwo').append(`<option value="${prop}">${menuNames[prop]}</option>`);
    rateyRates.push(menuNames[prop]);
  }
  return rateyRates;
};

Rates.requestRates = function(callback) {
  $.get('http://apilayer.net/api/live?access_key=0e0b2c550a586eca8af82847a443b3ed')
    .then(data => Rates.names = data, err => console.error(err))
    .then(callback)
    .then(() =>{
      allData.forEach((element, i) => {
        element.addRate(rateyRates[i]);
        // console.log(element);
      });
      populateFilters();
    });
};

Currency.requestNames = function(callback) {
  $.get('http://apilayer.net/api/list?access_key=0e0b2c550a586eca8af82847a443b3ed')
    .then(data => Currency.names = data, err => console.error(err))
    .then(callback)
    .then(() => {
      for (var i = 0; i < moneyNames.length; i++) {
        allData.push(new Data(moneyNames[i], threeCodes[i]));
      }
      Rates.requestRates(populateRates);
    });
    // .then(() => console.log(allData));
};

Currency.doThings = function() {
  Currency.requestNames(populateNames);
  // Rates.requestRates(populateRates);
};

let menuOne = [];
let menuTwo = [];

$('#currencyOne').change(function(){
  menuOne.unshift($(this).val());
});

$('#currencyTwo').change(function(){
  menuTwo.unshift($(this).val());
});

Currency.doThings();
populateFilters();
