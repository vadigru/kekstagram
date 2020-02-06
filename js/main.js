'use strict';
var KeyCode = {
  ENTER: 'Enter',
  ESC: 'Escape'
};
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
var DEFAULT_PIN_POSITION = '455px';
var DEFAULT_LINE_WIDTH = '455px';
var MIN_ZOOM = 25;
var STEP_ZOOM = 25;
var MAX_ZOOM = 100;
var BLUR_VALUE = 3;
var BRIGHTNESS_VALUE = 2;
var BRIGHTNESS_CORRECTION = 1;
var body = document.querySelector('body');
var pictureUpload = document.querySelector('#upload-file');
var pictureEdit = document.querySelector('.img-upload__overlay');
var picturePreview = pictureEdit.querySelector('.img-upload__preview img');
var pictureHashtag = pictureEdit.querySelector('.text__hashtags');
var preset = pictureEdit.querySelector('.effects');
var presetLevel = pictureEdit.querySelector('.effect-level__value');
var presetChrome = preset.querySelector('#effect-chrome');
var presetSepia = preset.querySelector('#effect-sepia');
var presetMarvin = preset.querySelector('#effect-marvin');
var presetPhobos = preset.querySelector('#effect-phobos');
var presetHeat = preset.querySelector('#effect-heat');
var sliderBlock = pictureEdit.querySelector('.effect-level');
var sliderPin = sliderBlock.querySelector('.effect-level__pin');
var sliderLine = sliderBlock.querySelector('.effect-level__line');
var sliderDepthLine = sliderBlock.querySelector('.effect-level__depth');
var zoom = pictureEdit.querySelector('.scale');
var zoomOut = zoom.querySelector('.scale__control--smaller');
var zoomLevel = zoom.querySelector('.scale__control--value');
var zoomIn = zoom.querySelector('.scale__control--bigger');
var popupPicture = document.querySelector('.big-picture');


// popup open and close handlers ----------------------------------------------
var bodyModalOpen = function () {
  body.classList.add('modal-open');
};

var bodyModalClose = function () {
  body.classList.remove('modal-open');
};

var popupOpen = function () {
  showPictureEdit();
  hideSlider();
  bodyModalOpen();
};

var popupClose = function () {
  hidePictureEdit();
  hidePopupPicture();
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
  if (evt.key === KeyCode.ESC) {
    popupClose();
  }
};

var onPictureThumbnailClick = function (evt) {
  var target = evt.target;
  if (target.getAttribute('data-id')) {
    evt.preventDefault();
    showPopupPicture(userPosts[target.getAttribute('data-id')]);
  }
};

// get random element from array. get random number in range. ---------------
var getRandomValue = function (min, array) {
  var max = array;
  return Array.isArray(array) === true ?
    array[Math.floor(Math.random() * max.length)] :
    Math.floor(min + Math.random() * (max + 1 - min));
};

// generate random data for userPosts ----------------------------------------
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

// shuffle array for more fun ------------------------------------------------
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

// render posts using generated data from userPosts --------------------------
var renderPost = function (data, index) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var templateElement = template.cloneNode(true);
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

showPosts(userPosts);

// picture scale handling -----------------------------------------------------
var getZoomNumber = function () {
  var number = parseInt(zoomLevel.value.substring(0, zoomLevel.value.length - 1), 10);
  return number;
};

var zoomPicture = function () {
  picturePreview.style.transform = 'scale(' + getZoomNumber() / 100 + ')';
};

var onZoomPlusClick = function () {
  if (getZoomNumber() === MAX_ZOOM) {
    return;
  }
  zoomLevel.value = getZoomNumber() + STEP_ZOOM + '%';
  zoomPicture();
};

var onZoomMinusClick = function () {
  if (getZoomNumber() === MIN_ZOOM) {
    return;
  }
  zoomLevel.value = getZoomNumber() - STEP_ZOOM + '%';
  zoomPicture();
};

// get values for filters -----------------------------------------------------
var getSaturation = function () {
  var value = Math.floor((sliderPin.offsetLeft * 100) / sliderLine.clientWidth);
  presetLevel.value = value;
  return value;
};

var getBlur = function () {
  var value = Math.floor((sliderPin.offsetLeft * BLUR_VALUE)
                        / sliderLine.clientWidth);
  presetLevel.value = value;
  return value;
};

var getBrightness = function () {
  var value = Math.floor(((sliderPin.offsetLeft * BRIGHTNESS_VALUE)
                         / sliderLine.clientWidth)) + BRIGHTNESS_CORRECTION;
  presetLevel.value = value;
  return value;
};

// show hide filter slider ----------------------------------------------------
var showSlider = function () {
  sliderBlock.classList.remove('hidden');
};

var hideSlider = function () {
  sliderBlock.classList.add('hidden');
};

// change filter saturation --------------------------------------------------
var onSliderPinMouseup = function () {
  if (presetChrome.checked) {
    picturePreview.style.filter = 'grayscale(' + getSaturation() / 100 + ')';
  }
  if (presetSepia.checked) {
    picturePreview.style.filter = 'sepia(' + getSaturation() / 100 + ')';
  }
  if (presetMarvin.checked) {
    picturePreview.style.filter = 'invert(' + getSaturation() + '%' + ')';
  }
  if (presetPhobos.checked) {
    picturePreview.style.filter = 'blur(' + getBlur() + 'px' + ')';
  }
  if (presetHeat.checked) {
    picturePreview.style.filter = 'brightness(' + getBrightness() + ')';
  }
};

// reset filter after filter selection from filter list ----------------------
var resetFilter = function () {
  picturePreview.style.filter = '';
  presetLevel.value = '';
  picturePreview.className = '';
  sliderPin.style.left = DEFAULT_PIN_POSITION;
  sliderDepthLine.style.width = DEFAULT_LINE_WIDTH;
};

// filter select from filter list ---------------------------------------------
var onPresetClick = function (evt) {
  var target = evt.target;
  resetFilter();
  showSlider();
  if (target.value === 'none') {
    hideSlider();
  }
  if (target.value === 'chrome') {
    getSaturation();
    picturePreview.classList.add('effects__preview--chrome');
  }
  if (target.value === 'sepia') {
    getSaturation();
    picturePreview.classList.add('effects__preview--sepia');
  }
  if (target.value === 'marvin') {
    getSaturation();
    picturePreview.classList.add('effects__preview--marvin');
  }
  if (target.value === 'phobos') {
    getBlur();
    picturePreview.classList.add('effects__preview--phobos');
  }
  if (target.value === 'heat') {
    getBrightness();
    picturePreview.classList.add('effects__preview--heat');
  }
};

// show/hide popup of picture edit ------------------------------------------------
var hidePictureEdit = function () {
  pictureEdit.classList.add('hidden');
};

var showPictureEdit = function () {
  var pictureComment = pictureEdit.querySelector('.text__description');
  var submitButton = pictureEdit.querySelector('.img-upload__submit');
  pictureEdit.classList.remove('hidden');
  zoomLevel.value = '100%';
  resetFilter();
  zoomIn.addEventListener('click', onZoomPlusClick);
  zoomOut.addEventListener('click', onZoomMinusClick);
  sliderPin.addEventListener('mouseup', onSliderPinMouseup);
  preset.addEventListener('click', onPresetClick);
  submitButton.addEventListener('click', onSubmitButtonClick);
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

// hashtags validation --------------------------------------------------------
var isHashtagHaveSharp = function (arr) {
  var result = false;
  arr.forEach(function (item) {
    if (item.charAt(0) !== '#' && item !== '') {
      result = true;
    }
  });
  return result;
};

var isHashtagEmpty = function (arr) {
  var result = false;
  arr.forEach(function (item) {
    if (item.charAt(0) === '#' && item.length === 1) {
      result = true;
    }
  });
  return result;
};

var isHashtagTooLong = function (arr) {
  var result = false;
  arr.forEach(function (item) {
    if (item.length > 20) {
      result = true;
    }
  });
  return result;
};

var isSimilarElement = function (arr) {
  var result = false;
  var lowercaseArr = [];
  arr.forEach(function (item) {
    lowercaseArr.push(item.toLowerCase());
  });
  lowercaseArr.forEach(function (item, i) {
    if (lowercaseArr.indexOf(item, i + 1) > -1 && item !== '') {
      if (result.indexOf(item) === -1) {
        result = true;
      }
    }
  });
  return result;
};

var isSpecialCharacter = function (arr) {
  var allowedSymbols = /^[#][\w]+$/;
  var result = false;
  arr.forEach(function (item) {
    if (!item.match(allowedSymbols)) {
      result = true;
    }
  });
  return result;
};

var onSubmitButtonClick = function () {
  var hashtags = pictureHashtag.value.split(' ');
  if (isHashtagHaveSharp(hashtags)) {
    pictureHashtag.setCustomValidity('Хэш-тег должен начинаться с "#".');
  } else if (isHashtagEmpty(hashtags)) {
    pictureHashtag.setCustomValidity('Хэш-тег не может быть пустым.');
  } else if (isHashtagTooLong(hashtags)) {
    pictureHashtag.setCustomValidity('Слишком длинный хэш-тег. ' +
                                    'Максимальная длина хэш-тега 20 символов.');
  } else if (hashtags.length > 5) {
    pictureHashtag.setCustomValidity('Введенных хэш-тегов ' + hashtags.length +
                                    '. ' + 'Максимальная количество хэш-тегов "5".');
  } else if (isSimilarElement(hashtags)) {
    pictureHashtag.setCustomValidity('Хэш-теги не могут быть одинаковыми.');
  } else if (isSpecialCharacter(hashtags)) {
    pictureHashtag.setCustomValidity('Хэш-тег должн состоять из букв и чисел и ' +
                                    'не может содержать пробелы, спецсимволы, ' +
                                    'символы пунктуации, эмодзи и т.д.');
  } else {
    pictureHashtag.setCustomValidity('');
  }
};

// add listeners to pictures preview and upload field -----------------------
var addListeners = function () {
  var picturesBlock = document.querySelector('.pictures');
  var pictureEditClose = pictureEdit.querySelector('.img-upload__cancel');
  var popupPictureClose = document.querySelector('.big-picture__cancel');
  picturesBlock.addEventListener('click', onPictureThumbnailClick);
  pictureUpload.addEventListener('change', onUploadClick);
  pictureEditClose.addEventListener('click', onCrossClickClose);
  popupPictureClose.addEventListener('click', onCrossClickClose);
};

addListeners();
