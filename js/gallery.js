'use strict';
(function () {
  var userPosts;

  // open big picture on thumbnail click --------------------------------------
  var onThumbnailClick = function (evt) {
    var target = evt.target;
    var pictureId = target.getAttribute('data-id');
    if (pictureId) {
      evt.preventDefault();
      window.popup.showPicturePreview(userPosts[pictureId]);
    }
  };

  var onThumbnailEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onThumbnailClick);
  };

  // render posts using generated data from userPosts --------------------------
  var renderPost = function (data, index) {
    var template = document.querySelector('#picture').content;
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.picture').setAttribute('data-id', index);
    templateElement.querySelector('.picture__img').setAttribute('data-id', index);
    templateElement.querySelector('.picture__img').src = data.url;
    templateElement.querySelector('.picture__likes').textContent = data.likes;
    templateElement.querySelector('.picture__comments').textContent = data.comments.length;
    return templateElement;
  };

  // create fragment using generated data from userPosts -----------------------
  var buildFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item, index) {
      fragment.appendChild(renderPost(item, index));
    });
    return fragment;
  };

  // add listeners to pictures preview and upload field -----------------------
  var addListeners = function () {
    var picturesBlock = document.querySelector('.pictures');
    picturesBlock.addEventListener('click', onThumbnailClick);
    picturesBlock.addEventListener('click', onThumbnailEnterPress);
  };

  // show user posts -----------------------------------------------------------
  var showPosts = function (arr) {
    userPosts = arr;
    var postedPics = document.querySelector('.pictures');
    postedPics.appendChild(buildFragment(userPosts));
  };

  var onLoadSuccessHandle = function (data) {
    showPosts(data);
    addListeners();
    window.filters.showFilterMenu(data);
  };

  var onLoadErrorHandle = function (errorMessage) {
    window.modal.showModalError(errorMessage);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);

  window.gallery = {
    showPosts: showPosts
  };
})();
