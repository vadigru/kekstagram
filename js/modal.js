'use strict';
(function () {
  var pageBody = document.querySelector('body');
  var pageMain = document.querySelector('main');
  var modalError;
  var modalSuccess;

  var hideModalError = function () {
    pageMain.removeChild(modalError);
    window.popup.backgroundScrollStart();
    document.removeEventListener('keydown', onModalErrorEscPress);
  };

  var hideModalSuccess = function () {
    pageMain.removeChild(modalSuccess);
    window.popup.backgroundScrollStart();
    document.removeEventListener('keydown', onModalSuccessEscPress);
  };

  var onModalErrorEscPress = function (evt) {
    window.util.isEscEvent(evt, hideModalError);
  };

  var onModalSuccessEscPress = function (evt) {
    window.util.isEscEvent(evt, hideModalSuccess);
  };

  // show modal error/success -------------------------------------------------
  var showModalError = function (message) {
    var template = document.querySelector('#error').content.querySelector('.error');
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.error__title').textContent = message;
    templateElement.querySelector('.error__button').textContent = 'Попробовать позже';
    pageMain.appendChild(templateElement);
    modalError = templateElement;
    pageBody.addEventListener('click', onModalErrorlClick);
    document.addEventListener('keydown', onModalErrorEscPress);
  };

  var showModalSuccess = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var templateElement = template.cloneNode(true);
    pageMain.appendChild(templateElement);
    modalSuccess = templateElement;
    pageBody.addEventListener('click', onModalSuccessClick);
    document.addEventListener('keydown', onModalSuccessEscPress);
  };

  // hide error/success modal -------------------------------------------------
  var onModalErrorlClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('error') || target.classList.contains('error__button')) {
      pageMain.removeChild(modalError);
      window.popup.backgroundScrollStart();
    }
    pageBody.removeEventListener('click', onModalErrorlClick);
    document.removeEventListener('keydown', onModalErrorEscPress);
  };

  var onModalSuccessClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('success') || target.classList.contains('success__button')) {
      pageMain.removeChild(modalSuccess);
      window.popup.backgroundScrollStart();
    }
    pageBody.removeEventListener('click', onModalSuccessClick);
    document.removeEventListener('keydown', onModalSuccessEscPress);
  };

  window.modal = {
    showModalError: showModalError,
    showModalSuccess: showModalSuccess
  };
})();
