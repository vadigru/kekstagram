'use strict';
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
var DESCRIPTION = [
  'Прекрасный вид прекрасного вида',
  'Зачётно провели время',
  'Расслабляемся по-полной',
  'Лучше просто не бывает',
  'Эти воспоминания ничем не стереть',
  'Так просто потому что можем'
];
var POSTS_COUNT = 25;
var MIN = 0;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR = 1;
var MAX_AVATAR = 6;
var MIN_COMMENTS = 1;

// gets random element from array. gets random number in range. ---------------
var getRandomValue = function (min, array) {
  var max = array;
  return Array.isArray(array) === true ?
    array[Math.floor(Math.random() * max.length)] :
    Math.floor(min + Math.random() * (max + 1 - min));
};

// generates random data for userPosts ----------------------------------------
var generateData = function (count) {
  var posts = [];
  var photoInfo = {};
  var generateComments = function (array) {
    var userComments = [];
    for (var j = 0; j < getRandomValue(MIN_COMMENTS, array.length); j++) {
      var comment = {
        'avatar': 'img/avatar-' + getRandomValue(MIN_AVATAR, MAX_AVATAR) + '.svg',
        'message': getRandomValue(MIN, COMMENTS),
        'name': getRandomValue(MIN, COMMENTATORS)
      };
      userComments.push(comment);
    }
    return userComments;
  };
  for (var i = 1; i <= count; i++) {
    photoInfo = {
      'url': 'photos/' + i + '.jpg',
      'description': getRandomValue(MIN, DESCRIPTION),
      'likes': getRandomValue(MIN_LIKES, MAX_LIKES),
      'comments': generateComments(COMMENTS)
    };
    posts.push(photoInfo);
  }

  return posts;
};

// shuffles array for more fun ------------------------------------------------
var shuffleArray = function (array) {
  var j;
  var k;
  for (var i = array.length - 1; i > 0; i--) {
    j = getRandomValue(MIN, i);
    k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
  return array;
};

var userPosts = shuffleArray(generateData(POSTS_COUNT));

// renders posts using generated data from userPosts --------------------------
var renderPost = function (data) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var templateElement = template.cloneNode(true);
  templateElement.querySelector('.picture__img').src = data.url;
  templateElement.querySelector('.picture__likes').textContent = data.likes;
  templateElement.querySelector('.picture__comments').textContent = data.comments.length;
  return templateElement;
};

// creates fragment using generated data from userPosts -----------------------
var buildFragment = function (array) {
  var fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(renderPost(item));
  });
  return fragment;
};

// shows user posts -----------------------------------------------------------
var showPosts = function (array) {
  var postedPics = document.querySelector('.pictures');
  postedPics.appendChild(buildFragment(array));
};

showPosts(userPosts);

// adds cooments to popup with big photo ----------------------------------------
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

// shows popup with big photo  --------------------------------------------------
var showPopupPic = function (item) {
  var bodyModalOpen = document.querySelector('body');
  var popupPic = document.querySelector('.big-picture');
  bodyModalOpen.classList.add('modal-open');
  popupPic.classList.remove('hidden');
  popupPic.querySelector('.social__comment-count').classList.add('hidden');
  popupPic.querySelector('.comments-loader').classList.add('hidden');
  popupPic.querySelector('.big-picture__img img').src = item.url;
  popupPic.querySelector('.likes-count').textContent = item.likes;
  popupPic.querySelector('.comments-count').textContent = item.comments.length;
  popupPic.querySelector('.social__caption').textContent = item.description;
  popupPic.querySelector('.social__comments').appendChild(renderComments(item.comments));
};

showPopupPic(userPosts[0]);
