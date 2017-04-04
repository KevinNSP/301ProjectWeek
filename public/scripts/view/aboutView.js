'use strict';

(function(module) {
  const aboutView = {};

  aboutView.init = function() {
    $('.tab-content').hide();
    $('#about').fadeIn();
  }

  module.aboutView = aboutView;
})(window);
