'use strict';

(function(module){
  const calculator = {};

  calculator.calculate = function() {
    let end = menuTwo[0];
    let start = menuOne[0];

    let rate = end / start;

    console.log($('#starting-number').val());
    let result = $('#starting-number').val() * rate;

    $('#ending-number').val(result);
  };

  module.calculator = calculator;
}(window));

$('#starting-number').on('change', function() {
  calculator.calculate();
});
