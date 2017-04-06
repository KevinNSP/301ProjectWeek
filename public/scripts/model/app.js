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

Currency.convert = function(data) {
  data = data.map(function(object) {
    let dataPoint = new Data(object.name, object.code);
    dataPoint.addRate(object.rate);
    return dataPoint;
  });
  return data;
};

function populateFilters(){
  for (var i = 0; i < allData.length; i++) {
    $('#currencyOne').append(`<option value = "${allData[i].rate}">${allData[i].name}</option>`);
    $('#currencyTwo').append(`<option value = "${allData[i].rate}">${allData[i].name}</option>`);
  }
}

function populateNames(){
  for(let prop in Currency.names.currencies){
    let menuNames = Currency.names.currencies;
    threeCodes.push(prop);
    moneyNames.push(menuNames[prop]);
  }
};

function populateRates(){
  for(let prop in Rates.names.quotes){
    let menuNames = Rates.names.quotes;
    rateyRates.push(menuNames[prop]);
  }
  return rateyRates;
};

Rates.requestRates = function(callback) {
  $.get(`/apilayer/live`)
    .then(data => Rates.names = JSON.parse(data), err => console.error(err))
    .then(callback)
    .then(() =>{
      allData.forEach((element, i) => {
        element.addRate(rateyRates[i]);
      });
      populateFilters();
      localStorage.allData = JSON.stringify(allData);
      let hourCurrent = new Date().getHours();
      localStorage.hour = hourCurrent;
      tickerData();
    });
};

Currency.requestNames = function(callback) {
  $.get(`/apilayer/list`)
    .then(data => Currency.names = JSON.parse(data), err => console.error(err))
    .then(callback)
    .then(() => {
      for (var i = 0; i < moneyNames.length; i++) {
        allData.push(new Data(moneyNames[i], threeCodes[i]));
      }
      Rates.requestRates(populateRates);
    });
};

function tickerData() {
  allData.forEach(function(e) {
    $('marquee').append('<p>' + e.code + ': ' + e.rate + '</p>');
  });
}

Currency.check = function() {
  let hourCurrent = new Date().getHours();
  if (localStorage.allData) {
    if (parseInt(localStorage.hour) === hourCurrent) {
      allData = JSON.parse(localStorage.allData);
      allData = Currency.convert(allData);
      populateFilters();
      tickerData();
    } else {
      Currency.requestNames(populateNames);
    }
  } else {
    Currency.requestNames(populateNames);
  }
};

let menuOne = [];
let menuTwo = [];
let currencyOne = [];
let currencyTwo = [];

$('#currencyOne').change(function(){
  menuOne.unshift($(this).val());
  currencyOne.unshift($(this).find('option:selected').text());
});

$('#currencyTwo').change(function(){
  menuTwo.unshift($(this).val());
  currencyTwo.unshift($(this).find('option:selected').text());
});

Currency.check();
