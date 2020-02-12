'use strict';
(function () {
  var PIN_WIDTH = 18;
  var PIN_HALF = PIN_WIDTH / 2;
  var MIN_PIN_POSITION = 0;
  var MAX_PIN_POSITION = 453;
  var sliderBlock = document.querySelector('.effect-level');
  var sliderPin = sliderBlock.querySelector('.effect-level__pin');
  var sliderDepthLine = sliderBlock.querySelector('.effect-level__depth');

  // change slider pin position -----------------------------------------------
  var setPinPosition = function (shift) {
    var shiftedLeft = sliderPin.offsetLeft - shift;
    if (shiftedLeft < MIN_PIN_POSITION + PIN_HALF) {
      sliderPin.style.left = MIN_PIN_POSITION + PIN_HALF + 'px';
    } else if (shiftedLeft > MAX_PIN_POSITION - PIN_HALF) {
      sliderPin.style.left = MAX_PIN_POSITION - PIN_HALF + 'px';
    } else {
      sliderPin.style.left = shiftedLeft + 'px';
      sliderDepthLine.style.width = shiftedLeft + 'px';
    }
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
