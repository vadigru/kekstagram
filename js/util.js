'use strict';
(function () {
  var KeyCode = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };
  var MIN_VALUE = 0;
  var pageBody = document.querySelector('body');
  var pageMain = document.querySelector('main');
  var modalError;

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
    var template = document.querySelector('#error').content.querySelector('.error');
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.error__title').textContent = message;
    templateElement.querySelector('.error__button').textContent = 'Попробовать позже';
    pageMain.appendChild(templateElement);
    modalError = document.querySelector('.error');
    pageBody.addEventListener('click', onErrorModalClick);
    document.addEventListener('keydown', onModalEsc);
  };

  // hide request error popup -------------------------------------------------
  var hideErrorModal = function () {
    pageMain.removeChild(modalError);
    document.removeEventListener('keydown', onModalEsc);
  };

  var onModalEsc = function (evt) {
    window.util.isEscEvent(evt, hideErrorModal);
  };

  var onErrorModalClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('error') || target.classList.contains('error__button')) {
      pageMain.removeChild(modalError);
    }
    pageBody.removeEventListener('click', onErrorModalClick);
    document.removeEventListener('keydown', onModalEsc);
  };

  window.util = {
    getRandomValue: getRandomValue,
    shuffleArray: shuffleArray,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    showErrorModal: showErrorModal,
    hideErrorModal: hideErrorModal
  };
})();
