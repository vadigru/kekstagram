'use strict';
(function () {
  var KeyCode = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };
  var MIN_VALUE = 0;
  var UPDATE_INTERVAL = 500;

  // get random element from array. get random number in range. ---------------
  var getRandomValue = function (min, array) {
    var max = array;
    return Array.isArray(array) === true ?
      array[Math.floor(Math.random() * max.length)] :
      Math.floor(min + Math.random() * (max + 1 - min));
  };

  // shuffle array for more fun -----------------------------------------------
  var shuffleArray = function (array) {
    var j;
    var k;
    for (var i = array.length - 1; i > 0; i--) {
      j = getRandomValue(MIN_VALUE, i);
      k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
    return array;
  };

  // escape button press handler ----------------------------------------------
  var isEscEvent = function (evt, action) {
    if (evt.key === KeyCode.ESC) {
      action();
    }
  };

  // enter button press handler -----------------------------------------------
  var isEnterEvent = function (evt, action) {
    if (evt.key === KeyCode.ENTER) {
      action();
    }
  };

  // switch bounce effect elimination -----------------------------------------
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, UPDATE_INTERVAL);
    };
  };

  window.util = {
    getRandomValue: getRandomValue,
    shuffleArray: shuffleArray,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    debounce: debounce
  };
})();
