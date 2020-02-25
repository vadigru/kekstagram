'use strict';
(function () {
  var pageMain = document.querySelector('main');
  var activeModal;

  // hide error/success modal -------------------------------------------------
  var hideModal = function () {
    pageMain.removeChild(activeModal);
    window.popup.toggleScroll();
    activeModal.removeEventListener('click', onModalClick);
    document.removeEventListener('keydown', onModalEscPress);
  };

  var onModalClick = function (evt) {
    var target = evt.target;
    var activeModalCloseBtn = activeModal.querySelector('BUTTON');
    if (target === activeModal || target === activeModalCloseBtn) {
      hideModal();
    }
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, hideModal);
  };

  // show modal error/success -------------------------------------------------
  var showModal = function (el) {
    pageMain.appendChild(el);
    activeModal = el;
    activeModal.addEventListener('click', onModalClick);
    document.addEventListener('keydown', onModalEscPress);
  };

  var showModalError = function (message) {
    var template = document.querySelector('#error').content.querySelector('.error');
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.error__title').textContent = message;
    templateElement.querySelector('.error__button').textContent = 'Попробовать снова';
    showModal(templateElement);
    window.popup.toggleScroll();
  };

  var showModalSuccess = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var templateElement = template.cloneNode(true);
    showModal(templateElement);
  };

  window.modal = {
    showModalError: showModalError,
    showModalSuccess: showModalSuccess
  };
})();
