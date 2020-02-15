'use strict';
(function () {
  var KeyCode = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };
  var MIN_VALUE = 0;
  var popupError = document.querySelector('.modal--error');

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

  // show request error popup -------------------------------------------------
  var showErrorModal = function (message) {
    var modalText = popupError.querySelector('.modal__message');
    popupError.classList.remove('modal--hidden');
    modalText.textContent = message;
    popupError.addEventListener('click', onModalErrorClick);
    document.addEventListener('keydown', window.popup.onPopupEsc);
  };

  // hide request error popup -------------------------------------------------
  var onModalErrorClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('modal') || target.classList.contains('modal__close')) {
      popupError.classList.add('modal--hidden');
    }
    popupError.removeEventListener('click', onModalErrorClick);
    document.removeEventListener('keydown', window.popup.onPopupEsc);
  };

  window.util = {
    getRandomValue: getRandomValue,
    shuffleArray: shuffleArray,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    showErrorModal: showErrorModal
  };
})();
