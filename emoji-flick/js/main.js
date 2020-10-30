'use strict';

$(function() {
    $(".overlay-btn-setting").click(function() {
          $(".overlayall-setting").fadeIn();　/*ふわっと表示*/
});
    $(".overlayall-setting").click(function() {
          $(".overlayall-setting").fadeOut();　/*ふわっと消える*/
});
});