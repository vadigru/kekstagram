'use strict';
(function () {
  var BLUR_VALUE = 3;
  var BRIGHTNESS_VALUE = 2;
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
    var value = Math.floor((sliderPin.offsetLeft * 100)
                          / sliderLine.clientWidth);
    sliderPresetLevel.value = value;
    return value;
  };

  var getBlur = function () {
    var value = ((sliderPin.offsetLeft * BLUR_VALUE)
                          / sliderLine.clientWidth).toFixed(2);
    sliderPresetLevel.value = value;
    return value;
  };

  var getBrightness = function () {
    var value = ((sliderPin.offsetLeft * BRIGHTNESS_VALUE)
                          / sliderLine.clientWidth
                          + BRIGHTNESS_CORRECTION).toFixed(2);
    sliderPresetLevel.value = value;
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

    if (presetChrome.checked) {
      picturePreview.style.filter = 'grayscale(' + getSaturation() / 100 + ')';
    }
    if (presetSepia.checked) {
      picturePreview.style.filter = 'sepia(' + getSaturation() / 100 + ')';
    }
    if (presetMarvin.checked) {
      picturePreview.style.filter = 'invert(' + getSaturation() + '%' + ')';
    }
    if (presetPhobos.checked) {
      picturePreview.style.filter = 'blur(' + getBlur() + 'px' + ')';
    }
    if (presetHeat.checked) {
      picturePreview.style.filter = 'brightness(' + getBrightness() + ')';
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

