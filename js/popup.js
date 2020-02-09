'use strict';
(function () {
  var body = document.querySelector('body');
  var popupPicture = document.querySelector('.big-picture');
  var pictureUpload = document.querySelector('#upload-file');
  var pictureEdit = document.querySelector('.img-upload__overlay');

  // popup open and close handlers ----------------------------------------------
  var bodyModalOpen = function () {
    body.classList.add('modal-open');
  };

  var bodyModalClose = function () {
    body.classList.remove('modal-open');
  };

  var popupOpen = function () {
    showPictureEdit();
    window.preset.hideSlider();
    bodyModalOpen();
  };

  var popupClose = function () {
    hidePictureEdit();
    window.popup.hidePopupPicture();
    bodyModalClose();
    pictureUpload.value = '';
    document.removeEventListener('keydown', onPopupEsc);
  };

  var onUploadClick = function () {
    popupOpen();
  };

  var onCrossClickClose = function () {
    popupClose();
  };

  var onPopupEsc = function (evt) {
    window.util.isEscEvent(evt, popupClose);
  };

  // show/hide popup of picture edit ------------------------------------------------
  var hidePictureEdit = function () {
    pictureEdit.classList.add('hidden');
  };

  var showPictureEdit = function () {
    var zoom = document.querySelector('.scale');
    var zoomOut = zoom.querySelector('.scale__control--smaller');
    var zoomLevel = zoom.querySelector('.scale__control--value');
    var zoomIn = zoom.querySelector('.scale__control--bigger');
    var preset = pictureEdit.querySelector('.effects');
    var pictureHashtag = pictureEdit.querySelector('.text__hashtags');
    var pictureComment = pictureEdit.querySelector('.text__description');
    var submitButton = pictureEdit.querySelector('.img-upload__submit');

    pictureEdit.classList.remove('hidden');
    zoomLevel.value = '100%';
    window.preset.resetPreset();
    zoomIn.addEventListener('click', window.zoom.onZoomPlusClick);
    zoomOut.addEventListener('click', window.zoom.onZoomMinusClick);
    preset.addEventListener('click', window.preset.onPresetClick);
    submitButton.addEventListener('click', window.validation.onSubmitButtonClick);
    document.addEventListener('keydown', onPopupEsc);
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

  // add cooments to popup with big photo --------------------------------------
  var renderComments = function (array) {
    var fragment = document.createDocumentFragment();
    var commentsBlock = document.querySelector('.social__comments');
    var commentTemplate = commentsBlock.querySelector('.social__comment');
    commentsBlock.textContent = '';
    array.forEach(function (item) {
      var commentElement = commentTemplate.cloneNode(true);
      var commentAvatar = commentElement.querySelector('.social__picture');
      commentAvatar.src = item.avatar;
      commentAvatar.alt = item.name;
      commentAvatar.width = '35';
      commentAvatar.height = '35';
      commentElement.querySelector('.social__text').textContent = item.message;
      fragment.appendChild(commentElement);
    });
    return fragment;
  };

  // show/hide popup with big photo  ------------------------------------------------
  var hidePopupPicture = function () {
    popupPicture.classList.add('hidden');
  };

  var showPopupPicture = function (item) {
    bodyModalOpen();
    popupPicture.classList.remove('hidden');
    popupPicture.querySelector('.social__comment-count').classList.add('hidden');
    popupPicture.querySelector('.comments-loader').classList.add('hidden');
    popupPicture.querySelector('.big-picture__img img').src = item.url;
    popupPicture.querySelector('.likes-count').textContent = item.likes;
    popupPicture.querySelector('.comments-count').textContent = item.comments.length;
    popupPicture.querySelector('.social__caption').textContent = item.description;
    popupPicture.querySelector('.social__comments').appendChild(renderComments(item.comments));
    document.addEventListener('keydown', onPopupEsc);
  };

  // open photo from gallery --------------------------------------------------
  var onThumbnailClick = function (evt) {
    var target = evt.target;
    var pictureId = target.getAttribute('data-id');
    if (pictureId) {
      evt.preventDefault();
      showPopupPicture(window.userPosts[pictureId]);
    }
  };

  var onThumbnailEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onThumbnailClick);
  };

  // add listeners to pictures preview and upload field -----------------------
  var addListeners = function () {
    var picturesBlock = document.querySelector('.pictures');
    var pictureEditClose = pictureEdit.querySelector('.img-upload__cancel');
    var popupPictureClose = document.querySelector('.big-picture__cancel');
    picturesBlock.addEventListener('click', onThumbnailClick);
    picturesBlock.addEventListener('click', onThumbnailEnterPress);
    pictureUpload.addEventListener('change', onUploadClick);
    pictureEditClose.addEventListener('click', onCrossClickClose);
    popupPictureClose.addEventListener('click', onCrossClickClose);
  };

  addListeners();

  window.popup = {
    hidePopupPicture: hidePopupPicture
  };
})();
