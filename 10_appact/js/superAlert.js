(function(doc, win) {
  var _alert = window.alert;
  var _super_alert_timer = null;
  MyAlert = function(text){
      $('.super_alert').remove();
      clearTimeout(_super_alert_timer);
      $('body').append('<div class="super_alert">' + text + '</div>');
      _super_alert_timer = setTimeout(function(){
          $('.super_alert').remove();
      }, 2500);
  };
  MyAlert.noConflict = function() {
      window.alert = _alert;
  };
  window.alert = window.MyAlert = MyAlert;
})(document, window);