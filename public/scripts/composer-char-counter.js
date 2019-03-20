$(document).ready(function() {
  $('.new-tweet').on('input', function(event) {
    let leng = $('.new-tweet textarea').val().length;
    $(".new-tweet .counter").text(140 - leng);
    if (140 - leng < 0 && !$(".new-tweet .counter").hasClass("belowZero") ||
        140 - leng >= 0 && $(".new-tweet .counter").hasClass("belowZero")) {
      $(".new-tweet .counter").toggleClass("belowZero");
    }
  });
});
