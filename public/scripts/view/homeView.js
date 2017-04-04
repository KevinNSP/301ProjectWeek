'use strict';

(function(module) {
  const homeView = {};

  homeView.init = function() {
    $('.tab-content').hide();
    $('#home').fadeIn();
  }
  
  module.homeView = homeView;
})(window);
