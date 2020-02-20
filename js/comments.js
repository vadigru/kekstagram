'use strict';
(function () {
  var COMMENTS_COUNT_STEP = 5;
  var socComments = document.querySelector('.social__comments');
  var loader = document.querySelector('.comments-loader');
  var comments;

  // add cooments to popup with big photo --------------------------------------
  var renderComments = function (arr) {
    var fragment = document.createDocumentFragment();
    var commentsBlock = document.querySelector('.social__comments');
    var commentTemplate = commentsBlock.querySelector('.social__comment');
    commentsBlock.textContent = '';
    arr.forEach(function (item) {
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

  // set listener of comment loader -------------------------------------------
  var onLoadMoreClick = function () {
    socComments.appendChild(renderComments(getNextComments(comments)));
  };

  // comments counter ---------------------------------------------------------
  var counter = {
    amount: 0,
    doCount: function () {
      this.amount += COMMENTS_COUNT_STEP;
    },
    resetCount: function () {
      this.amount = 0;
      loader.classList.add('hidden');
      loader.removeEventListener('click', onLoadMoreClick);
    }
  };

  // show number of displayed comments ----------------------------------------
  var renderCommentsCount = function (result, arr) {
    var commentsBlock = document.querySelector('.social__comment-count');
    var commentsCount = document.createElement('span');
    commentsCount.classList.add('comments-count');
    commentsCount.textContent = result.length + ' из ' + arr.length + ' комментариев';
    commentsBlock.textContent = '';
    commentsBlock.appendChild(commentsCount);
  };

  // get next comments to display with step of five comments ------------------
  var getNextComments = function (arr) {
    var result;
    if (result === undefined) {
      counter.doCount();
      result = arr.slice(0, counter.amount);
    } else if (result.length < arr.length) {
      counter.doCount();
      result = arr.slice(0, counter.amount);
    }
    if (result.length >= arr.length) {
      counter.resetCount();
    }
    renderCommentsCount(result, arr);
    return result;
  };

  // get first five comments to display ---------------------------------------
  var getFiveComments = function (arr) {
    var result;
    comments = arr;
    if (arr.length <= COMMENTS_COUNT_STEP) {
      result = arr;
      renderCommentsCount(result, arr);
      loader.classList.add('hidden');
    } else {
      result = getNextComments(arr);
    }
    return result;
  };

  window.comments = {
    onLoadMoreClick: onLoadMoreClick,
    renderComments: renderComments,
    getFiveComments: getFiveComments,
    counter: counter
  };
})();
