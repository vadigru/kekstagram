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
var MAX_ZOOM = 100;
var BLUR_VALUE = 3;
var BRIGHTNESS_VALUE = 2;
var BRIGHTNESS_CORRECTION = 1;
var PCT = 100;
var body = document.querySelector('body');
var pictureUpload = document.querySelector('#upload-file');
var pictureEdit = document.querySelector('.img-upload__overlay');
var picturePreview = pictureEdit.querySelector('.img-upload__preview img');
var pictureEditClose = pictureEdit.querySelector('.img-upload__cancel');
var pictureHashtag = pictureEdit.querySelector('.text__hashtags');
var presetsList = pictureEdit.querySelector('.effects__list');
var presetLevel = pictureEdit.querySelector('.effect-level__value');
var sliderBlock = pictureEdit.querySelector('.effect-level');
var sliderPin = sliderBlock.querySelector('.effect-level__pin');
var sliderLine = sliderBlock.querySelector('.effect-level__line');
var sliderDepthLine = sliderBlock.querySelector('.effect-level__depth');
var zoom = document.querySelector('.scale');
var zoomOut = zoom.querySelector('.scale__control--smaller');
var zoomValue = zoom.querySelector('.scale__control--value');
var zoomIn = zoom.querySelector('.scale__control--bigger');
var original = presetsList.querySelector('#effect-none');
var chrome = presetsList.querySelector('#effect-chrome');
var sepia = presetsList.querySelector('#effect-sepia');
var marvin = presetsList.querySelector('#effect-marvin');
var phobos = presetsList.querySelector('#effect-phobos');
var heat = presetsList.querySelector('#effect-heat');
var popupPic = document.querySelector('.big-picture');
var popupPicClose = document.querySelector('.big-picture__cancel');

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
  hidePopupPic();
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
var renderPost = function (data) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var templateElement = template.cloneNode(true);
  templateElement.querySelector('.picture__img').src = data.url;
  templateElement.querySelector('.picture__likes').textContent = data.likes;
  templateElement.querySelector('.picture__comments').textContent = data.comments.length;
  return templateElement;
};

// create fragment using generated data from userPosts -----------------------
var buildFragment = function (array) {
  var fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(renderPost(item));
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
  var zoomArray = zoomValue.value.split('');
  var newArray = zoomArray.slice(0, zoomArray.length - 1);
  var number = parseInt(newArray.join(''), 10);
  return number;
};

var zoomPicture = function () {
  picturePreview.style.transform = 'scale(' + getZoomNumber() / PCT + ')';
};

var onZoomPlusClick = function () {
  if (getZoomNumber() === MAX_ZOOM) {
    zoomValue.value = MAX_ZOOM + '%';
  } else {
    zoomValue.value = getZoomNumber() + MIN_ZOOM + '%';
    zoomPicture();
  }
};

var onZoomMinusClick = function () {
  if (getZoomNumber() === MIN_ZOOM) {
    zoomValue.value = MIN_ZOOM + '%';
  } else {
    zoomValue.value = getZoomNumber() - MIN_ZOOM + '%';
    zoomPicture();
  }
};

// get values for filters -----------------------------------------------------
var getSaturation = function () {
  var value = Math.floor((sliderPin.offsetLeft * PCT) / sliderLine.clientWidth);
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

// change filter saturation --------------------------------------------------
var onSliderPinMouseup = function () {
  if (chrome.checked) {
    picturePreview.style.filter = 'grayscale(' + getSaturation() / PCT + ')';
  }
  if (sepia.checked) {
    picturePreview.style.filter = 'sepia(' + getSaturation() / PCT + ')';
  }
  if (marvin.checked) {
    picturePreview.style.filter = 'invert(' + getSaturation() + '%' + ')';
  }
  if (phobos.checked) {
    picturePreview.style.filter = 'blur(' + getBlur() + 'px' + ')';
  }
  if (heat.checked) {
    picturePreview.style.filter = 'brightness(' + getBrightness() + ')';
  }
};

// show hide filter slider ----------------------------------------------------
var showSlider = function () {
  sliderBlock.classList.remove('hidden');
};

var hideSlider = function () {
  sliderBlock.classList.add('hidden');
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
var onNonePresetClick = function () {
  hideSlider();
  resetFilter();
};

var onChromePresetClick = function () {
  showSlider();
  resetFilter();
  getSaturation();
  picturePreview.classList.add('effects__preview--chrome');
};

var onSepiaPresetClick = function () {
  showSlider();
  resetFilter();
  getSaturation();
  picturePreview.classList.add('effects__preview--sepia');
};

var onMarvinPresetClick = function () {
  showSlider();
  resetFilter();
  getSaturation();
  picturePreview.classList.add('effects__preview--marvin');
};

var onPhobosPresetClick = function () {
  showSlider();
  resetFilter();
  getBlur();
  picturePreview.classList.add('effects__preview--phobos');
};

var onHeatPresetClick = function () {
  showSlider();
  resetFilter();
  getBrightness();
  picturePreview.classList.add('effects__preview--heat');
};

// show/hide popup of picture edit ------------------------------------------------
var hidePictureEdit = function () {
  pictureEdit.classList.add('hidden');
};

var showPictureEdit = function () {
  pictureEdit.classList.remove('hidden');
  zoomValue.value = '100%';
  resetFilter();
  zoomIn.addEventListener('click', onZoomPlusClick);
  zoomOut.addEventListener('click', onZoomMinusClick);
  sliderPin.addEventListener('mouseup', onSliderPinMouseup);
  original.addEventListener('click', onNonePresetClick);
  chrome.addEventListener('click', onChromePresetClick);
  sepia.addEventListener('click', onSepiaPresetClick);
  marvin.addEventListener('click', onMarvinPresetClick);
  phobos.addEventListener('click', onPhobosPresetClick);
  heat.addEventListener('click', onHeatPresetClick);
  pictureHashtag.addEventListener('input', onHashtagInput);
  document.addEventListener('keydown', onPopupEsc);
  pictureHashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEsc);
  });
  pictureHashtag.addEventListener('blur', function () {
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

// open popup with big photo  ------------------------------------------------
var hidePopupPic = function () {
  popupPic.classList.add('hidden');
};

var showPopupPic = function (item) {
  bodyModalOpen();
  popupPic.classList.remove('hidden');
  popupPic.querySelector('.social__comment-count').classList.add('hidden');
  popupPic.querySelector('.comments-loader').classList.add('hidden');
  popupPic.querySelector('.big-picture__img img').src = item.url;
  popupPic.querySelector('.likes-count').textContent = item.likes;
  popupPic.querySelector('.comments-count').textContent = item.comments.length;
  popupPic.querySelector('.social__caption').textContent = item.description;
  popupPic.querySelector('.social__comments').appendChild(renderComments(item.comments));
  document.addEventListener('keydown', onPopupEsc);
};

// hashtags validation --------------------------------------------------------
var isHashtagHaveSharp = function (arr) {
  var result = [];
  arr.forEach(function (item) {
    if (item.charAt(0) !== '#' && item !== '') {
      result.push(item);
    }
  });
  return result;
};

var isHashtagEmpty = function (arr) {
  var result = [];
  arr.forEach(function (item) {
    if (item.charAt(0) === '#' && item.length === 1) {
      result.push(item);
    }
  });
  return result;
};

var isHashtagTooLong = function (arr) {
  var result = [];
  arr.forEach(function (item) {
    if (item.length > 20) {
      result.push(item);
    }
  });
  return result;
};

var isSimilarElement = function (arr) {
  var result = [];
  var lowercaseArr = [];
  arr.forEach(function (item) {
    lowercaseArr.push(item.toLowerCase());
  });
  lowercaseArr.forEach(function (item, i) {
    if (lowercaseArr.indexOf(item, i + 1) > -1 && item !== '') {
      if (result.indexOf(item) === -1) {
        result.push(item);
      }
    }
  });
  return result;
};

var isSpecialCharacter = function (arr) {
  var letters = /^[#][0-9A-Za-z]+$/;
  var result = [];
  arr.forEach(function (item) {
    if (!item.match(letters)) {
      result.push(item);
    }
  });
  return result;
};

var onHashtagInput = function () {
  var hashtags = pictureHashtag.value.split(' ');
  hashtags.forEach(function (item, i, arr) {
    if (isHashtagHaveSharp(arr).length !== 0) {
      pictureHashtag.setCustomValidity('Хэш-тег должен начинаться с "#".');
    } else if (isHashtagEmpty(arr).length !== 0) {
      pictureHashtag.setCustomValidity('Хэш-тег не может быть пустым.');
    } else if (isHashtagTooLong(arr).length !== 0) {
      pictureHashtag.setCustomValidity('Слишком длинный хэш-тег. ' +
                                     'Максимальная длина хэш-тега 20 символов.');
    } else if (hashtags.length > 5) {
      pictureHashtag.setCustomValidity('Введенных хэш-тегов ' + hashtags.length +
                                     '. ' + 'Максимальная количество хэш-тегов "5".');
    } else if (isSimilarElement(arr).length !== 0) {
      pictureHashtag.setCustomValidity('Хэш-теги не могут быть одинаковыми.');
    } else if (isSpecialCharacter(arr).length !== 0) {
      pictureHashtag.setCustomValidity('Хэш-тег должн состоять из букв и чисел и ' +
                                     'не может содержать пробелы, спецсимволы, ' +
                                     'символы пунктуации, эмодзи и т.д.');
    } else {
      pictureHashtag.setCustomValidity('');
    }
  });
};

// add listeners to pictures preview and upload field -----------------------
var addListeners = function () {
  var pictures = document.querySelectorAll('.picture');
  [].forEach.call(pictures, function (item, i) {
    item.href = '';
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      showPopupPic(userPosts[i]);
    });
  });
  pictureUpload.addEventListener('change', onUploadClick);
  pictureEditClose.addEventListener('click', onCrossClickClose);
  popupPicClose.addEventListener('click', onCrossClickClose);
};

addListeners();
