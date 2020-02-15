'use strict';
(function () {
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
  var buildFragment = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item, index) {
      fragment.appendChild(renderPost(item, index));
    });
    return fragment;
  };

  // show user posts -----------------------------------------------------------
  var showPosts = function (array) {
    var postedPics = document.querySelector('.pictures');
    postedPics.appendChild(buildFragment(array));
  };

  var onLoadSuccessHandle = function (data) {
    window.userPosts = data.map(function (item) {
      return item;
    });
    showPosts(window.userPosts);
  };

  var onLoadErrorHandle = function (errorMessage) {
    window.util.showErrorModal(errorMessage);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);
})();
