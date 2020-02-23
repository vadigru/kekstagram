'use strict';
(function () {
  var body = document.querySelector('body');
  var picturePreview = document.querySelector('.big-picture');
  var picturePreviewClose = picturePreview.querySelector('.big-picture__cancel');
  var pictureUpload = document.querySelector('#upload-file');
  var pictureEdit = document.querySelector('.img-upload__overlay');
  var pictureEditClose = pictureEdit.querySelector('.img-upload__cancel');
  var zoomOut = pictureEdit.querySelector('.scale__control--smaller');
  var zoomLevel = pictureEdit.querySelector('.scale__control--value');
  var zoomIn = pictureEdit.querySelector('.scale__control--bigger');
  var preset = pictureEdit.querySelector('.effects');
  var submitButton = pictureEdit.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');
  var loader = document.querySelector('.comments-loader');

  // page scroll handling when popup is opened ----------------------------------
  var backgroundScrollStop = function () {
    body.classList.add('modal-open');
  };

  var backgroundScrollStart = function () {
    body.classList.remove('modal-open');
  };

  // popup close handlers -----------------------------------------------------
  var popupClose = function () {
    hidePictureEdit();
    hidePicturePreview();
    backgroundScrollStart();
  };

  var onCrossClickClose = function () {
    popupClose();
  };

  var onPopupEsc = function (evt) {
    window.util.isEscEvent(evt, popupClose);
  };

  // prevent close of picture edit while ----------------------------------- ->
  // -> hashtag or comment field is in focus ----------------------------------
  var preventPictureEditClose = function () {
    var pictureHashtag = pictureEdit.querySelector('.text__hashtags');
    var pictureComment = pictureEdit.querySelector('.text__description');
    pictureHashtag.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupEsc);
    });
    pictureHashtag.addEventListener('blur', function () {
      document.addEventListener('keydown', onPopupEsc);
    });

    pictureComment.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupEsc);
    });
    pictureComment.addEventListener('blur', function () {
      document.addEventListener('keydown', onPopupEsc);
    });
  };

  // show/hide popup of picture edit ------------------------------------------
  var hidePictureEdit = function () {
    pictureEdit.classList.add('hidden');
    pictureUpload.value = '';
    form.reset();
    zoomIn.removeEventListener('click', window.zoom.onZoomPlusClick);
    zoomOut.removeEventListener('click', window.zoom.onZoomMinusClick);
    preset.removeEventListener('click', window.preset.onPresetClick);
    submitButton.removeEventListener('click', window.validation.onSubmitButtonClick);
    pictureEditClose.removeEventListener('click', onCrossClickClose);
    document.removeEventListener('keydown', onPopupEsc);
  };

  var showPictureEdit = function () {
    pictureEdit.classList.remove('hidden');
    zoomLevel.value = '100%';
    window.preset.resetPreset();
    window.preset.hideSlider();
    zoomIn.addEventListener('click', window.zoom.onZoomPlusClick);
    zoomOut.addEventListener('click', window.zoom.onZoomMinusClick);
    preset.addEventListener('click', window.preset.onPresetClick);
    submitButton.addEventListener('click', window.validation.onSubmitButtonClick);
    pictureEditClose.addEventListener('click', onCrossClickClose);
    document.addEventListener('keydown', onPopupEsc);
    backgroundScrollStop();
    preventPictureEditClose();
  };

  // show/hide popup with big photo  ------------------------------------------------
  var hidePicturePreview = function () {
    picturePreview.classList.add('hidden');
    window.comments.resetCount();
    loader.classList.remove('hidden');
    picturePreviewClose.removeEventListener('click', onCrossClickClose);
    document.removeEventListener('keydown', onPopupEsc);
  };

  var showPicturePreview = function (item) {
    picturePreview.classList.remove('hidden');
    picturePreview.querySelector('.big-picture__img img').src = item.url;
    picturePreview.querySelector('.likes-count').textContent = item.likes;
    picturePreview.querySelector('.comments-count').textContent = item.comments.length;
    picturePreview.querySelector('.social__caption').textContent = item.description;
    picturePreview.querySelector('.social__comments').appendChild(window.comments.initComments(item.comments));
    picturePreviewClose.addEventListener('click', onCrossClickClose);
    document.addEventListener('keydown', onPopupEsc);
    loader.addEventListener('click', window.comments.onLoadMoreClick);
    backgroundScrollStop();
  };

  window.popup = {
    onCrossClickClose: onCrossClickClose,
    onPopupEsc: onPopupEsc,
    showPicturePreview: showPicturePreview,
    showPictureEdit: showPictureEdit,
    hidePictureEdit: hidePictureEdit
  };
})();
