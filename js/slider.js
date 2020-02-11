'use strict';
(function () {
  var MIN_PIN_POSITION = 0;
  var MAX_PIN_POSITION = 455;
  var sliderBlock = document.querySelector('.effect-level');
  var sliderPin = sliderBlock.querySelector('.effect-level__pin');
  var sliderDepthLine = sliderBlock.querySelector('.effect-level__depth');

  // change slider pin position -----------------------------------------------
  var setPinPosition = function (shift) {
    if (sliderPin.offsetLeft <= MIN_PIN_POSITION) {
      sliderPin.style.left = MIN_PIN_POSITION + 'px';
    } else if (sliderPin.offsetLeft >= MAX_PIN_POSITION) {
      sliderPin.style.left = MAX_PIN_POSITION + 'px';
    }
    sliderPin.style.left = sliderPin.offsetLeft - shift + 'px';
    sliderDepthLine.style.width = sliderPin.offsetLeft - shift + 'px';
  };

  // slider listener ----------------------------------------------------------
  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      setPinPosition(shift.x);
      window.preset.setPresetValue();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
