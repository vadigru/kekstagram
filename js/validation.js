'use strict';
(function () {
  var MAX_HASHTAG_COUNT = 5;
  var MAX_SYMBOL_COUNT = 20;
  var pictureHashtag = document.querySelector('.text__hashtags');

  // hashtags validation --------------------------------------------------------
  // check if hashtag is empty ------------------------------------------------
  var isHashtagEmpty = function (arr) {
    return arr.some(function (el) {
      return el.charAt(0) === '#' && el.length === 1;
    });
  };

  // check if hashtag isn't too long ------------------------------------------
  var isHashtagTooLong = function (arr) {
    return arr.some(function (el) {
      return el.length > MAX_SYMBOL_COUNT;
    });
  };

  // check if same hashtags are enetred ---------------------------------------
  var isSimilarElement = function (arr) {
    var lowercaseArr = arr.map(function (item) {
      return item.toLowerCase();
    });
    return lowercaseArr.some(function (el, i) {
      return lowercaseArr.indexOf(el, i + 1) > -1 && el !== '';
    });
  };

  // check if hashtag have special characters ---------------------------------
  var isSpecialCharacter = function (arr) {
    var allowedSymbols = /^[#][а-яА-ЯёЁa-zA-Z0-9]+$/i;
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

  // get error message if incorrect data entered ------------------------------
  var getError = function () {
    var hashtags = pictureHashtag.value.split(' ');
    if (hashtags.length > MAX_HASHTAG_COUNT) {
      return 'Введенных хэш-тегов ' + hashtags.length + '. ' +
             'Максимальное количество хэш-тегов "' + MAX_HASHTAG_COUNT + '".';
    }
    if (isHashtagEmpty(hashtags)) {
      return 'Хэш-тег не может состоять только из "#".';
    }
    if (!isHashtagPresent(hashtags) && isSpecialCharacter(hashtags)) {
      return 'Хэш-тег должен начинаться с "#" и ' +
             'не может содержать пробелы, спецсимволы, ' +
             'символы пунктуации и т.д.';
    }
    if (isSimilarElement(hashtags)) {
      return 'Хэш-теги не могут быть одинаковыми.';
    }
    if (isHashtagTooLong(hashtags)) {
      return 'Слишком длинный хэш-тег. ' +
             'Максимальная длина хэш-тега ' +
              MAX_SYMBOL_COUNT + ' символов.';
    }
    return '';
  };

  // initialize form validation ------------------------------------------------
  var arrangeValidation = function () {
    var error = getError();
    pictureHashtag.setCustomValidity(error);
    return error === '';
  };

  window.validation = {
    arrange: arrangeValidation
  };
})();
