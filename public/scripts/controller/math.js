'use strict';

(function(module){
  const calculator = {};

  calculator.calculate = function() {
    let end = $('#currencyTwo').val();
    console.log(end);
    let start = $('#currencyOne').val();
    console.log(start);

    let rate = (end)/(start);

    let result = $('#starting-number').val * rate;

    $('#ending-number').val(result);
  };

  $('#input').on('change', function() {
    calculator.calculate();
  });

  module.calculator = calculator;
}(window))
