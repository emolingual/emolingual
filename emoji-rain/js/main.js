'use strict';

$(function() {
    $(".overlay-btn-setting").click(function() {
          $(".overlayall-setting").fadeIn();　/*ふわっと表示*/
});
    $(".overlayall-setting").click(function() {
          $(".overlayall-setting").fadeOut();　/*ふわっと消える*/
});
});


// テキストエリアを伸ばす
function flexTextarea(el) {
  const dummy = el.querySelector('.FlexTextarea__dummy')
  el.querySelector('.FlexTextarea__textarea').addEventListener('input', e => {
    dummy.textContent = e.target.value + '\u200b'
  })
}

document.querySelectorAll('.FlexTextarea').forEach(flexTextarea)