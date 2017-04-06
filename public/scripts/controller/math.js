'use strict';

(function(module){
  const calculator = {};

  calculator.calculate = function() {
    let end = menuTwo[0];
    let start = menuOne[0];
    let rate = end / start;

    let result = $('#starting-number').val() * rate;

    let finalOutput = $('#ending-number').html(result.toFixed(2));
    return finalOutput;

  };

  module.calculator = calculator;
}(window));

function returnValues(){
  calculator.calculate();
  let firstVal = $('#starting-number').val();
  $('#firstCurrency').html(currencyOne[0], ' = ');
  $('#first').html(firstVal);
  $('#secondCurrency').html(currencyTwo[0]);
  $('#equals').html(' = ');
};

$('#button').click(function() {
  if($('#starting-number').val() <= 0 || $('#firstCurrency').text() === '--Select Base Currency--' || $('#secondCurrency').text() === '--Select Other Currency--'){
    $('#iAmError').html('Please Select Two Currencies and a Value.');
    $('#firstCurrency').html('');
    $('#first').html('');
    $('#secondCurrency').html('');
    $('#equals').html('');
  }else{
    returnValues();
  };
});
