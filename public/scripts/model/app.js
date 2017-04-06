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
  console.log('converting data');
  data = data.map(function(object) {
    console.log(object);
    let dataPoint = new Data(object.name, object.code)
    dataPoint.addRate(object.rate);
    console.log(dataPoint);
    return dataPoint;
  });
  console.log(data);
  return data;
}



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
  $.get(`/apilayer/live`)
    .then(data => Rates.names = JSON.parse(data), err => console.error(err))
    .then(callback)
    .then(() =>{
      allData.forEach((element, i) => {
        element.addRate(rateyRates[i]);
        // console.log(element);
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
    // .then(() => console.log(allData));
};

function tickerData() {
  allData.forEach(function(e) {
    console.log(e, 'line 96');
    $("marquee").append("<p>" + e.code + ": " + e.rate + "</p>");
  })
}

Currency.check = function() {
  let hourCurrent = new Date().getHours();
  console.log('begin check');
  if (localStorage.allData) {
    if (parseInt(localStorage.hour) === hourCurrent) {
      console.log('using localStorage Data');
      allData = JSON.parse(localStorage.allData);
      allData = Currency.convert(allData);
      populateFilters();
      tickerData();
    } else {
      console.log('getting new data');
      Currency.requestNames(populateNames);
    }
  } else {
    console.log('getting new data');
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
  console.log($(this).find('option:selected').text());
});

$('#currencyTwo').change(function(){
  menuTwo.unshift($(this).val());
  currencyTwo.unshift($(this).find('option:selected').text());
});

Currency.check();
