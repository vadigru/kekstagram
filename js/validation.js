'use strict';
(function () {
  // hashtags validation --------------------------------------------------------
  // check if hashtag have hash symbol ------------------------------------------
  var isHashSymbolAbsent = function (arr) {
    var result = false;
    arr.forEach(function (item) {
      if (item.charAt(0) !== '#' && item !== '') {
        result = true;
      }
    });
    return result;
  };

  // check if hashtag is empty ------------------------------------------------
  var isHashtagEmpty = function (arr) {
    var result = false;
    arr.forEach(function (item) {
      if (item.charAt(0) === '#' && item.length === 1) {
        result = true;
      }
    });
    return result;
  };

  // check if hashtag isn't too long ------------------------------------------
  var isHashtagTooLong = function (arr) {
    var result = false;
    arr.forEach(function (item) {
      if (item.length > 20) {
        result = true;
      }
    });
    return result;
  };

  // check if same hashtags are enetred ---------------------------------------
  var isSimilarElement = function (arr) {
    var result = false;
    var lowercaseArr = arr.map(function (item) {
      return item.toLowerCase();
    });
    lowercaseArr.forEach(function (item, i) {
      if (lowercaseArr.indexOf(item, i + 1) > -1 && item !== '') {
        result = true;
      }
    });
    return result;
  };

  // check if hashtag have special characters ---------------------------------
  var isSpecialCharacter = function (arr) {
    var allowedSymbols = /^[#][\w]+$/;
    var result = false;
    arr.forEach(function (item) {
      if (!item.match(allowedSymbols)) {
        result = true;
      }
    });
    return result;
  };

  // hashtag errors handler ---------------------------------------------------
  var onSubmitButtonClick = function () {
    var pictureHashtag = document.querySelector('.text__hashtags');
    var hashtags = pictureHashtag.value.split(' ');
    if (isHashSymbolAbsent(hashtags)) {
      pictureHashtag.setCustomValidity('Хэш-тег должен начинаться с "#".');
    } else if (isHashtagEmpty(hashtags)) {
      pictureHashtag.setCustomValidity('Хэш-тег не может быть пустым.');
    } else if (isHashtagTooLong(hashtags)) {
      pictureHashtag.setCustomValidity('Слишком длинный хэш-тег. ' +
                                      'Максимальная длина хэш-тега 20 символов.');
    } else if (hashtags.length > 5) {
      pictureHashtag.setCustomValidity('Введенных хэш-тегов ' + hashtags.length +
                                      '. ' + 'Максимальная количество хэш-тегов "5".');
    } else if (isSimilarElement(hashtags)) {
      pictureHashtag.setCustomValidity('Хэш-теги не могут быть одинаковыми.');
    } else if (isSpecialCharacter(hashtags)) {
      pictureHashtag.setCustomValidity('Хэш-тег должн состоять из букв и чисел и ' +
                                      'не может содержать пробелы, спецсимволы, ' +
                                      'символы пунктуации, эмодзи и т.д.');
    } else {
      pictureHashtag.setCustomValidity('');
    }
  };

  window.validation = {
    onSubmitButtonClick: onSubmitButtonClick
  };
})();
