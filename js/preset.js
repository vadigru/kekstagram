'use strict';
(function () {
  var MAX_BLUR = 3;
  var MAX_BRIGHTNESS = 3;
  var BRIGHTNESS_CORRECTION = 1;
  var MIN_PIN_POSITION = 0;
  var picturePreview = document.querySelector('.img-upload__preview img');
  var sliderBlock = document.querySelector('.effect-level');
  var sliderPresetLevel = sliderBlock.querySelector('.effect-level__value');
  var sliderPin = sliderBlock.querySelector('.effect-level__pin');
  var sliderLine = sliderBlock.querySelector('.effect-level__line');
  var sliderDepthLine = sliderBlock.querySelector('.effect-level__depth');
  var sliderLineWidth;

  // reset filter after filter selection from filter list ----------------------
  var resetPreset = function () {
    picturePreview.style.filter = '';
    sliderPresetLevel.value = 0;
    picturePreview.className = '';
    sliderPin.style.left = sliderLineWidth + 'px';
    sliderDepthLine.style.width = sliderLineWidth + 'px';
  };

  // get values for presets -----------------------------------------------------
  var getSaturation = function () {
    var value = (sliderPin.offsetLeft
                          / sliderLineWidth).toFixed(2);
    return value;
  };

  var getBlur = function () {
    var value = (sliderPin.offsetLeft * MAX_BLUR
                          / sliderLineWidth).toFixed(2);
    return value;
  };

  var getBrightness = function () {
    var value = (((sliderPin.offsetLeft
                          * (MAX_BRIGHTNESS - BRIGHTNESS_CORRECTION))
                          / sliderLineWidth) + BRIGHTNESS_CORRECTION).toFixed(2);
    return value;
  };

  // change filter saturation --------------------------------------------------
  var setPresetValue = function () {
    var filter = document.querySelector('#upload-select-image input[name="effect"]:checked');
    var presetResult;

    switch (filter.value) {
      case 'chrome':
        presetResult = getSaturation();
        picturePreview.style.filter = 'grayscale(' + presetResult + ')';
        break;
      case 'sepia':
        presetResult = getSaturation();
        picturePreview.style.filter = 'sepia(' + presetResult + ')';
        break;
      case 'marvin':
        presetResult = getSaturation() * 100;
        picturePreview.style.filter = 'invert(' + presetResult + '%' + ')';
        break;
      case 'phobos':
        presetResult = getBlur();
        picturePreview.style.filter = 'blur(' + presetResult + 'px' + ')';
        break;
      case 'heat':
        presetResult = getBrightness();
        picturePreview.style.filter = 'brightness(' + presetResult + ')';
        break;
    }
    sliderPresetLevel.value = presetResult;
  };

  // filter select from filter list ---------------------------------------------
  var toggleSlider = function (isVisible) {
    sliderBlock.classList.toggle('hidden', isVisible);
  };

  var onPresetClick = function (evt) {
    var target = evt.target;
    toggleSlider(target.value === 'none');
    sliderLineWidth = sliderLine.offsetWidth;
    resetPreset();
    setPresetValue();
    picturePreview.classList.add('effects__preview--' + target.value);
  };

  // change slider pin position -----------------------------------------------
  var setPinPosition = function (shift) {
    var shiftedLeft = sliderPin.offsetLeft - shift;
    var maxPinPosition = sliderLineWidth;

    if (shiftedLeft >= MIN_PIN_POSITION && shiftedLeft <= maxPinPosition) {
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
      setPresetValue();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.preset = {
    resetPreset: resetPreset,
    setPresetValue: setPresetValue,
    onPresetClick: onPresetClick,
    toggleSlider: toggleSlider
  };
})();

