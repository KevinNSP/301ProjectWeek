'use strict';
//  move this into app.js after we do a merge party
//  ALL RATES ARE COMPARED TO THE USD
liveRatesNames = [JPY, GBP, EUR, BTC, CHD, XAU];

liveRates = liveRatesNames.map(function(rate) {
  currency.rates.quotes.(USD + rate);
})
