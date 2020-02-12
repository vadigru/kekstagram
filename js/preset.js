'use strict';
(function () {
  var MAX_BLUR = 3;
  var MAX_BRIGHTNESS = 3;
  var BRIGHTNESS_CORRECTION = 1;
  var PIN_WIDTH = 18;
  var PIN_HALF = PIN_WIDTH / 2;
  var INITIAL_PIN_POSITION = 453;
  var LINE_WIDTH = 453;
  var picturePreview = document.querySelector('.img-upload__preview img');
  var sliderBlock = document.querySelector('.effect-level');
  var sliderPresetLevel = sliderBlock.querySelector('.effect-level__value');
  var sliderPin = sliderBlock.querySelector('.effect-level__pin');
  var sliderDepthLine = sliderBlock.querySelector('.effect-level__depth');

  // show hide filter slider ----------------------------------------------------
  var showSlider = function () {
    sliderBlock.classList.remove('hidden');
  };

  var hideSlider = function () {
    sliderBlock.classList.add('hidden');
  };

  // reset filter after filter selection from filter list ----------------------
  var resetPreset = function () {
    picturePreview.style.filter = '';
    sliderPresetLevel.value = '';
    picturePreview.className = '';
    sliderPin.style.left = INITIAL_PIN_POSITION - PIN_HALF + 'px';
    sliderDepthLine.style.width = LINE_WIDTH - PIN_WIDTH + 'px';
  };


  // get values for presets -----------------------------------------------------
  var getSaturation = function () {
    var value = ((sliderPin.offsetLeft - PIN_HALF)
                          / LINE_WIDTH).toFixed(2);
    return value;
  };

  var getBlur = function () {
    var value = (((sliderPin.offsetLeft - PIN_HALF) * MAX_BLUR)
                          / LINE_WIDTH).toFixed(2);
    return value;
  };

  var getBrightness = function () {
    var value = ((((sliderPin.offsetLeft - PIN_HALF)
                          * (MAX_BRIGHTNESS - BRIGHTNESS_CORRECTION))
                          / LINE_WIDTH) + BRIGHTNESS_CORRECTION).toFixed(2);
    return value;
  };

  // change filter saturation --------------------------------------------------
  var setPresetPreview = function (item) {
    picturePreview.classList.add('effects__preview--' + item);
  };

  var setInputValue = function (item) {
    sliderPresetLevel.value = item;
  };

  var setPresetValue = function () {
    var preset = document.querySelector('.effects');
    var presetChrome = preset.querySelector('#effect-chrome');
    var presetSepia = preset.querySelector('#effect-sepia');
    var presetMarvin = preset.querySelector('#effect-marvin');
    var presetPhobos = preset.querySelector('#effect-phobos');
    var presetHeat = preset.querySelector('#effect-heat');
    var presetResult;
    switch (true) {
      case presetChrome.checked:
        presetResult = getSaturation();
        picturePreview.style.filter = 'grayscale(' + presetResult + ')';
        break;
      case presetSepia.checked:
        presetResult = getSaturation();
        picturePreview.style.filter = 'sepia(' + presetResult + ')';
        break;
      case presetMarvin.checked:
        presetResult = getSaturation() * 100;
        picturePreview.style.filter = 'invert(' + presetResult + '%' + ')';
        break;
      case presetPhobos.checked:
        presetResult = getBlur();
        picturePreview.style.filter = 'blur(' + presetResult + 'px' + ')';
        break;
      case presetHeat.checked:
        presetResult = getBrightness();
        picturePreview.style.filter = 'brightness(' + presetResult + ')';
        break;
    }
    setInputValue(presetResult);
  };

  // filter select from filter list ---------------------------------------------
  var onPresetClick = function (evt) {
    var target = evt.target;
    resetPreset();
    showSlider();
    switch (target.value) {
      case 'none':
        hideSlider();
        break;
      case 'chrome':
        getSaturation();
        break;
      case 'sepia':
        getSaturation();
        break;
      case 'marvin':
        getSaturation();
        break;
      case 'phobos':
        getBlur();
        break;
      case 'heat':
        getBrightness();
        break;
    }
    setPresetPreview(target.value);
  };

  window.preset = {
    resetPreset: resetPreset,
    setPresetValue: setPresetValue,
    onPresetClick: onPresetClick,
    hideSlider: hideSlider
  };
})();

