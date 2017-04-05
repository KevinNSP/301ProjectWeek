'use strict';

(function(module){
  const calculator = {};

  calculator.calculate = function() {
    let end = menuTwo[0];
    let start = menuOne[0];
    let rate = end / start;

    console.log($('#starting-number').val());
    let result = $('#starting-number').val() * rate;

    let finalOutput = $('#ending-number').append(result.toFixed(2));
    return finalOutput;

  };

  module.calculator = calculator;
}(window));

$('#starting-number').on('change', function() {
  $('#allOutputs').hide();
  calculator.calculate();
  $('#allOutputs').show();
  let firstVal = $('#starting-number').val();
  $('#firstCurrency').append(currencyOne[0], ' = ');
  $('#first').append(firstVal);
  $('#secondCurrency').append(currencyTwo[0]);
});
