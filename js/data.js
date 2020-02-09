'use strict';
(function () {
  // generate random data for userPosts ----------------------------------------
  var generateData = function (count) {
    var posts = [];
    var photoInfo = {};
    var generateComments = function (array) {
      var userComments = [];
      for (var j = 0; j < window.util.getRandomValue(window.const.MIN_COMMENTS, array.length); j++) {
        var comment = {
          'avatar': 'img/avatar-' + window.util.getRandomValue(window.const.MIN_AVATAR, window.const.MAX_AVATAR) + '.svg',
          'message': window.util.getRandomValue(window.const.MIN, window.const.OMMENTS),
          'name': window.util.getRandomValue(window.const.MIN, window.const.COMMENTATORS)
        };
        userComments.push(comment);
      }
      return userComments;
    };
    for (var i = 1; i <= count; i++) {
      photoInfo = {
        'url': 'photos/' + i + '.jpg',
        'description': window.util.getRandomValue(window.const.MIN, window.const.DESCRIPTION),
        'likes': window.util.getRandomValue(window.const.MIN_LIKES, window.const.MAX_LIKES),
        'comments': generateComments(window.const.COMMENTS)
      };
      posts.push(photoInfo);
    }

    return posts;
  };

  window.userPosts = window.util.shuffleArray(generateData(window.const.POSTS_COUNT));
})();
