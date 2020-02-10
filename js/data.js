'use strict';
(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTATORS = [
    'Люсинда Гомес',
    'Чау Расма',
    'Нил Армстронг',
    'Ахмед Аль Ахмед',
    'Петр Первый',
    'Вам Лучше Не Знать'
  ];
  var DESCRIPTIONS = [
    'Прекрасный вид прекрасного вида',
    'Зачётно провели время',
    'Расслабляемся по-полной',
    'Лучше просто не бывает',
    'Эти воспоминания ничем не стереть',
    'Так просто потому что можем'
  ];
  var POSTS_COUNT = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_AVATAR = 1;
  var MAX_AVATAR = 6;
  var MIN_COMMENTS = 1;

  // generate random data for userPosts ----------------------------------------
  var generateData = function (count) {
    var posts = [];
    var photoInfo = {};
    var generateComments = function (array) {
      var userComments = [];
      for (var j = 0; j < window.util.getRandomValue(MIN_COMMENTS, array.length); j++) {
        var comment = {
          'avatar': 'img/avatar-' + window.util.getRandomValue(MIN_AVATAR, MAX_AVATAR) + '.svg',
          'message': window.util.getRandomValue(window.const.MIN, COMMENTS),
          'name': window.util.getRandomValue(window.const.MIN, COMMENTATORS)
        };
        userComments.push(comment);
      }
      return userComments;
    };
    for (var i = 1; i <= count; i++) {
      photoInfo = {
        'url': 'photos/' + i + '.jpg',
        'description': window.util.getRandomValue(window.const.MIN, DESCRIPTIONS),
        'likes': window.util.getRandomValue(MIN_LIKES, MAX_LIKES),
        'comments': generateComments(COMMENTS)
      };
      posts.push(photoInfo);
    }

    return posts;
  };

  window.userPosts = window.util.shuffleArray(generateData(POSTS_COUNT));
})();
