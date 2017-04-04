'use strict';

'use strict';

(function(module) {
  const appView = {};

  appView.init = function() {
    $('.tab-content').hide();
    $('#monies').fadeIn();
  }

$('Currency.names.currencies').on('click', function(){
  return this;
  console.log(this);
});

module.appView = appView;
})(window);
