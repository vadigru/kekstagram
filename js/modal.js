'use strict';
(function () {
  var pageBody = document.querySelector('body');
  var pageMain = document.querySelector('main');
  var modalError;
  var modalSuccess;

  var hideModal = function () {
    if (modalError) {
      pageMain.removeChild(modalError);
    }
    if (modalSuccess) {
      pageMain.removeChild(modalSuccess);
    }
    window.popup.backgroundScrollStart();
    document.removeEventListener('keydown', onModalEscPress);
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, hideModal);
  };

  // show modal error/success -------------------------------------------------
  var showErrorModal = function (message) {
    var template = document.querySelector('#error').content.querySelector('.error');
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.error__title').textContent = message;
    templateElement.querySelector('.error__button').textContent = 'Попробовать позже';
    pageMain.appendChild(templateElement);
    modalError = templateElement;
    pageBody.addEventListener('click', onErrorModalClick);
    document.addEventListener('keydown', onModalEscPress);
  };

  var showSuccessModal = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var templateElement = template.cloneNode(true);
    pageMain.appendChild(templateElement);
    modalSuccess = templateElement;
    pageBody.addEventListener('click', onSuccessModalClick);
    document.addEventListener('keydown', onModalEscPress);
  };

  // hide error/success modal -------------------------------------------------
  var onErrorModalClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('error') || target.classList.contains('error__button')) {
      pageMain.removeChild(modalError);
      window.popup.backgroundScrollStart();
    }
    pageBody.removeEventListener('click', onErrorModalClick);
    document.removeEventListener('keydown', onModalEscPress);
  };

  var onSuccessModalClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('success') || target.classList.contains('success__button')) {
      pageMain.removeChild(modalSuccess);
      window.popup.backgroundScrollStart();
    }
    pageBody.removeEventListener('click', onSuccessModalClick);
    document.removeEventListener('keydown', onModalEscPress);
  };

  window.modal = {
    showErrorModal: showErrorModal,
    showSuccessModal: showSuccessModal
  };
})();
