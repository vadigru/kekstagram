'use strict';
(function () {
  var RANDOM_POSTS_AMOUNT = 10;
  var userPosts;

  // set active status to menu item -------------------------------------------
  var highlightFilterMenuItem = function (target) {
    var filterButtons = document.querySelectorAll('.img-filters__button');
    filterButtons.forEach(function (item) {
      if (item.classList.contains('img-filters__button--active')) {
        item.classList.remove('img-filters__button--active');
      }
    });
    if (!target.classList.contains('img-filters__form') &&
        !target.classList.contains('img-filters__button--active')) {
      target.classList.add('img-filters__button--active');
    }
  };

  // update displayed user post thumbnails with sorted array ------------------
  var updatePosts = function (arr) {
    var postBlock = document.querySelector('.pictures');
    var postThumbs = document.querySelectorAll('.picture');
    postThumbs.forEach(function (item) {
      postBlock.removeChild(item);
    });
    window.gallery.showPosts(arr);
  };

  // filter array -------------------------------------------------------------
  var defaultPosts = function (arr) {
    updatePosts(arr);
  };

  var randomPosts = function (arr) {
    var randomArr = window.util.shuffleArray(arr.slice()).slice(0, RANDOM_POSTS_AMOUNT);
    updatePosts(randomArr);
  };

  var discussedPosts = function (arr) {
    var discussedArr = arr.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    updatePosts(discussedArr);
  };

  // add listener to filter menu items ----------------------------------------
  var selectFilter = function (evt) {
    var target = evt.target;
    switch (target.id) {
      case 'filter-default':
        defaultPosts(userPosts);
        break;
      case 'filter-random':
        randomPosts(userPosts);
        break;
      case 'filter-discussed':
        discussedPosts(userPosts);
        break;
    }
    highlightFilterMenuItem(target);
  };

  // activate filter menu -----------------------------------------------------
  var showFilterMenu = function (arr) {
    userPosts = arr;
    var filterBlock = document.querySelector('.img-filters');
    var filterList = filterBlock.querySelector('.img-filters__form');
    filterBlock.classList.remove('img-filters--inactive');
    filterList.addEventListener('click', function (evt) {
      window.util.debounce(evt, selectFilter);
    });
  };

  window.filters = {
    showFilterMenu: showFilterMenu
  };
})();
