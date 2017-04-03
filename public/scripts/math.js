'use strict';

let calculate = function() {
  let end = $('form #end').val();
  let start = $('form #start').val();
  let rate;

  if (start === 'USD') {
    rate = currency.rates['USD' + end];
  } else if (end === 'USD') {
    rate = 1/(currency.rates['USD' + start]);
  } else {
    rate = (currency.rates['USD' + end])/(currency.rates['USD' + start]);
  }

  let result = $('form #input').val * rate;

  $('form #result').val(result);
};
