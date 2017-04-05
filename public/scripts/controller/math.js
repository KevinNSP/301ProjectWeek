'use strict';

(function(module){
  const calculator = {};

  calculator.calculate = function() {
    let end = menuTwo[0];
    let start = menuOne[0];
    let rate = end / start;

    console.log($('#starting-number').val());
    let result = $('#starting-number').val() * rate;

    let finalOutput = $('#ending-number').html(result.toFixed(2));
    return finalOutput;

  };

  module.calculator = calculator;
}(window));

function clickOutput(){
  $('#starting-number').on('change', function() {
    calculator.calculate();
    let firstVal = $('#starting-number').val();
    $('#firstCurrency').html(currencyOne[0], ' = ');
    $('#first').html(firstVal);
    $('#secondCurrency').html(currencyTwo[0]);
  });
};

clickOutput();
