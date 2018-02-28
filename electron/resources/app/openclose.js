(function() {
  var openclose;

  openclose = function() {
    return $(".open-close-button").click(function() {
      return $(this).toggleClass("open");
    });
  };

  $(document).ready(function() {
    return openclose();
  });

}).call(this);
