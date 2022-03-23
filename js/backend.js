'use strict';
(function () {
  var Code = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  };
  var UPLOAD_URL = 'https://24.javascript.pages.academy/kekstagram';
  var LOAD_URL = 'https://24.javascript.pages.academy/kekstagram/data';

  var SERVER_TIME = 10000;

  // success/unsuccess request handling ---------------------------------------
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === Code.OK) {
        onLoad(xhr.response);
      } else if (xhr.status === Code.BAD_REQUEST) {
        onError('Неправильный запрос: ' + xhr.status);
      } else if (xhr.status === Code.NOT_FOUND) {
        onError('Ничего не найдено: ' + xhr.status);
      } else if (xhr.status === Code.INTERNAL_SERVER_ERROR) {
        onError('Внутренняя ошибка сервера: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });
    xhr.timeout = SERVER_TIME;
    return xhr;
  };

  // data load from server ----------------------------------------------------
  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  // data upload to server ----------------------------------------------------
  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
}());
