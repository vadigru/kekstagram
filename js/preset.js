'use strict';
(function () {
  var MIN_BLUR = 0;
  var MAX_BLUR = 3;
  var MIN_BRIGHTNESS = 1;
  var MAX_BRIGHTNESS = 2;
  var MIN_SATURATION = 0;
  var MAX_SATURATION = 100;
  var BRIGHTNESS_CORRECTION = 1;
  var DEFAULT_PIN_POSITION = '455';
  var DEFAULT_LINE_WIDTH = '455';
  var picturePreview = document.querySelector('.img-upload__preview img');
  var sliderBlock = document.querySelector('.effect-level');
  var sliderPresetLevel = sliderBlock.querySelector('.effect-level__value');
  var sliderPin = sliderBlock.querySelector('.effect-level__pin');
  var sliderLine = sliderBlock.querySelector('.effect-level__line');
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
    sliderPin.style.left = DEFAULT_PIN_POSITION + 'px';
    sliderDepthLine.style.width = DEFAULT_LINE_WIDTH + 'px';
  };

  // get values for presets -----------------------------------------------------
  var getSaturation = function () {
    var value = Math.floor((sliderPin.offsetLeft * MAX_SATURATION)
                          / sliderLine.clientWidth);
    return value;
  };

  var getBlur = function () {
    var value = ((sliderPin.offsetLeft * MAX_BLUR)
                          / sliderLine.clientWidth).toFixed(2);
    return value;
  };

  var getBrightness = function () {
    var value = ((sliderPin.offsetLeft * MAX_BRIGHTNESS)
                          / sliderLine.clientWidth
                          + BRIGHTNESS_CORRECTION).toFixed(2);
    return value;
  };

  // change filter saturation --------------------------------------------------
  var setPresetValue = function () {
    var preset = document.querySelector('.effects');
    var presetChrome = preset.querySelector('#effect-chrome');
    var presetSepia = preset.querySelector('#effect-sepia');
    var presetMarvin = preset.querySelector('#effect-marvin');
    var presetPhobos = preset.querySelector('#effect-phobos');
    var presetHeat = preset.querySelector('#effect-heat');
    var presetResult;

    var roundPresetRange = function (item, min, max) {
      if (item > max) {
        item = max;
      }
      if (item < min) {
        item = min;
      }
      return item;
    };

    var setInputValue = function (item) {
      sliderPresetLevel.value = item;
    };

    if (presetChrome.checked) {
      presetResult = roundPresetRange((getSaturation() / 100), MIN_SATURATION, MAX_SATURATION);
      picturePreview.style.filter = 'grayscale(' + presetResult + ')';
      setInputValue(presetResult);
    }
    if (presetSepia.checked) {
      presetResult = roundPresetRange((getSaturation() / 100), MIN_SATURATION, MAX_SATURATION);
      picturePreview.style.filter = 'sepia(' + presetResult + ')';
      setInputValue(presetResult);
    }
    if (presetMarvin.checked) {
      presetResult = roundPresetRange(getSaturation(), MIN_SATURATION, MAX_SATURATION);
      picturePreview.style.filter = 'invert(' + presetResult + '%' + ')';
      setInputValue(presetResult);
    }
    if (presetPhobos.checked) {
      presetResult = roundPresetRange(getBlur(), MIN_BLUR, MAX_BLUR);
      picturePreview.style.filter = 'blur(' + presetResult + 'px' + ')';
      setInputValue(presetResult);
    }
    if (presetHeat.checked) {
      presetResult = roundPresetRange(getBrightness(), MIN_BRIGHTNESS, (MAX_BRIGHTNESS
        + BRIGHTNESS_CORRECTION));
      picturePreview.style.filter = 'brightness(' + presetResult + ')';
      setInputValue(presetResult);
    }
  };

  // filter select from filter list ---------------------------------------------
  var onPresetClick = function (evt) {
    var target = evt.target;
    resetPreset();
    showSlider();
    if (target.value === 'none') {
      hideSlider();
    }
    if (target.value === 'chrome') {
      getSaturation();
      picturePreview.classList.add('effects__preview--chrome');
    }
    if (target.value === 'sepia') {
      getSaturation();
      picturePreview.classList.add('effects__preview--sepia');
    }
    if (target.value === 'marvin') {
      getSaturation();
      picturePreview.classList.add('effects__preview--marvin');
    }
    if (target.value === 'phobos') {
      getBlur();
      picturePreview.classList.add('effects__preview--phobos');
    }
    if (target.value === 'heat') {
      getBrightness();
      picturePreview.classList.add('effects__preview--heat');
    }
  };

  window.preset = {
    resetPreset: resetPreset,
    setPresetValue: setPresetValue,
    onPresetClick: onPresetClick,
    hideSlider: hideSlider
  };
})();

