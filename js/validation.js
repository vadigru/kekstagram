'use strict';
(function () {
  var MAX_HASHTAG_COUNT = 5;
  var MAX_SYMBOL_COUNT = 20;
  var pictureHashtag = document.querySelector('.text__hashtags');

  // hashtags validation --------------------------------------------------------
  // check if hashtag is empty ------------------------------------------------
  var isHashtagEmpty = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].charAt(0) === '#' && arr[i].length === 1) {
        return true;
      }
    }
    return false;
  };

  // check if hashtag isn't too long ------------------------------------------
  var isHashtagTooLong = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > MAX_SYMBOL_COUNT) {
        return true;
      }
    }
    return false;
  };

  // check if same hashtags are enetred ---------------------------------------
  var isSimilarElement = function (arr) {
    var lowercaseArr = arr.map(function (item) {
      return item.toLowerCase();
    });
    for (var i = 0; i < lowercaseArr.length; i++) {
      if (lowercaseArr.indexOf(lowercaseArr[i], i + 1) > -1 && lowercaseArr[i] !== '') {
        return true;
      }
    }
    return false;
  };

  // check if hashtag have special characters ---------------------------------
  var isSpecialCharacter = function (arr) {
    var allowedSymbols = /^[#][а-яА-ЯёЁa-zA-Z0-9]+$/;
    var result = false;
    arr.forEach(function (item) {
      if (!item.match(allowedSymbols)) {
        result = true;
      }
    });
    return result;
  };

  // check if none of hashtags presents ---------------------------------------
  var isHashtagPresent = function (arr) {
    return arr.length === 1 && arr[0] === '';
  };

  var getError = function () {
    var hashtags = pictureHashtag.value.split(' ');
    if (hashtags.length > MAX_HASHTAG_COUNT) {
      return ('Введенных хэш-тегов ' + hashtags.length +
                                      '. ' + 'Максимальная количество хэш-тегов "' + MAX_HASHTAG_COUNT + '".');
    }
    if (isHashtagEmpty(hashtags)) {
      return ('Хэш-тег не может быть пустым.');
    }
    if (!isHashtagPresent(hashtags) && isSpecialCharacter(hashtags)) {
      return ('Хэш-тег должен начинаться с "#" и ' +
                                      'не может содержать пробелы, спецсимволы, ' +
                                      'символы пунктуации и т.д.');
    }
    if (isSimilarElement(hashtags)) {
      return ('Хэш-теги не могут быть одинаковыми.');
    }
    if (isHashtagTooLong(hashtags)) {
      return ('Слишком длинный хэш-тег. ' +
                                      'Максимальная длина хэш-тега ' + MAX_SYMBOL_COUNT + ' символов.');
    }
    return '';
  };

  var arrangeValidation = function () {
    var error = getError();
    pictureHashtag.setCustomValidity(error);
    if (error === '') {
      return true;
    }
    return false;
  };

  window.validation = {
    arrangeValidation: arrangeValidation
  };
})();
