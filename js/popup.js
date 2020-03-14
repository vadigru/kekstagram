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
  var sliderBlock = document.querySelector('.effect-level');
  var sliderPin = sliderBlock.querySelector('.effect-level__pin');
  var submitButton = pictureEdit.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');
  var loader = document.querySelector('.comments-loader');

  // page scroll handling when popup is opened ----------------------------------
  var toggleScroll = function (isVisible) {
    body.classList.toggle('modal-open', isVisible);
  };

  // popup close handlers -----------------------------------------------------
  var popupClose = function () {
    hidePictureEdit();
    hidePicturePreview();
    toggleScroll(!'modal-open');
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
    window.zoom.reset();
    form.reset();
    zoomIn.removeEventListener('click', window.zoom.onPlusBtnClick);
    zoomOut.removeEventListener('click', window.zoom.onMinusBtnClick);
    preset.removeEventListener('click', window.preset.onSampleClick);
    sliderBlock.removeEventListener('click', window.preset.onSliderLineClick);
    sliderPin.removeEventListener('keydown', window.preset.onSliderPinArrowPress);
    submitButton.removeEventListener('click', window.form.onSubmitBtnClick);
    pictureEditClose.removeEventListener('click', onCrossClickClose);
    document.removeEventListener('keydown', onPopupEsc);
  };

  var showPictureEdit = function () {
    pictureEdit.classList.remove('hidden');
    zoomLevel.value = '100%';
    window.preset.reset();
    window.preset.toggleSlider('effect-level__line');
    zoomIn.addEventListener('click', window.zoom.onPlusBtnClick);
    zoomOut.addEventListener('click', window.zoom.onMinusBtnClick);
    preset.addEventListener('click', window.preset.onSampleClick);
    sliderBlock.addEventListener('click', window.preset.onSliderLineClick);
    sliderPin.addEventListener('keydown', window.preset.onSliderPinArrowPress);
    submitButton.addEventListener('click', window.form.onSubmitBtnClick);
    pictureEditClose.addEventListener('click', onCrossClickClose);
    document.addEventListener('keydown', onPopupEsc);
    toggleScroll('modal-open');
    preventPictureEditClose();
  };

  // show/hide popup with big photo  ------------------------------------------------
  var hidePicturePreview = function () {
    picturePreview.classList.add('hidden');
    window.comments.counter.resetCount();
    loader.classList.remove('hidden');
    picturePreviewClose.removeEventListener('click', onCrossClickClose);
    document.removeEventListener('keydown', onPopupEsc);
  };

  var showPicturePreview = function (item) {
    var commentsBlock = document.querySelector('.social__comments');
    var comments = document.querySelectorAll('.social__comment');
    picturePreview.classList.remove('hidden');
    picturePreview.querySelector('.big-picture__img img').src = item.url;
    picturePreview.querySelector('.likes-count').textContent = item.likes;
    picturePreview.querySelector('.comments-count').textContent = item.comments.length;
    picturePreview.querySelector('.social__caption').textContent = item.description;
    picturePreview.querySelector('.social__comments').appendChild(window.comments.init(item.comments));
    comments.forEach(function (comment) {
      commentsBlock.removeChild(comment);
    });
    picturePreviewClose.addEventListener('click', onCrossClickClose);
    document.addEventListener('keydown', onPopupEsc);
    loader.addEventListener('click', window.comments.onLoadMoreClick);
    toggleScroll('modal-open');
  };

  window.popup = {
    showPicturePreview: showPicturePreview,
    hidePicturePreview: hidePicturePreview,
    showPictureEdit: showPictureEdit,
    hidePictureEdit: hidePictureEdit,
    toggleScroll: toggleScroll
  };
})();
