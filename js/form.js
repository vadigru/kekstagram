'use strict';
(function () {
  var pictureHashtag = document.querySelector('.text__hashtags');

  var onSubmitSuccessHandle = function () {
    window.popup.hidePictureEdit();
    window.modal.showModalSuccess();
    pictureHashtag.style.outline = '';
    pictureHashtag.style.border = 'none';
  };

  var onSubmitErrorHandle = function () {
    var errorMessage = 'Ошибка отправки данных.';
    window.popup.hidePictureEdit();
    window.modal.showModalError(errorMessage);
  };

  var onSubmitButtonClick = function (evt) {
    if (window.validation.arrangeValidation()) {
      var form = document.querySelector('.img-upload__form');
      window.backend.upload(new FormData(form), onSubmitSuccessHandle, onSubmitErrorHandle);
      evt.preventDefault();
    } else {
      pictureHashtag.style.outline = '0';
      pictureHashtag.style.border = '2px solid red';
    }
  };

  window.form = {
    onSubmitButtonClick: onSubmitButtonClick
  };
})();
