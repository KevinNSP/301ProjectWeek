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
  $('#allOutputs').find('*').show();
  $('#iAmError').html('');
  calculator.calculate();
  let firstVal = $('#starting-number').val();
  $('#firstCurrency').html(currencyOne[0], ' = ');
  $('#first').html(firstVal);
  $('#secondCurrency').html(currencyTwo[0]);
  $('#equals').html(' = ');
};

function errorMessage(){
  $('#iAmError').html('Please Select Two Currencies and a Value.');
  $('#allOutputs').find('*').hide();
}

$('#button').on('click', function() {
  if($('#starting-number').val() <= 0){
    errorMessage();
  } else if (currencyOne[0] === '--Select Base Currency--'){
    errorMessage();
  } else if (currencyTwo[0] === '--Select Other Currency--'){
    errorMessage();
  // }else if(finalOutput === finalOutput.isNaN()){
  //   errorMessage();
  }else{
    returnValues();
  }
});
