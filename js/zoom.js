'use strict';
(function () {
  var MIN_ZOOM = 25;
  var STEP_ZOOM = 25;
  var MAX_ZOOM = 100;
  var pictureEdit = document.querySelector('.img-upload__overlay');
  var pictureZoom = pictureEdit.querySelector('.img-upload__preview img');
  var zoomLevel = pictureEdit.querySelector('.scale__control--value');

  // picture scale handling -----------------------------------------------------
  var getZoomNumber = function () {
    return parseInt(zoomLevel.value.substring(0, zoomLevel.value.length - 1), 10);
  };

  var zoomPicture = function (num) {
    pictureZoom.style.transform = 'scale(' + num / 100 + ')';
  };

  var onZoomPlusClick = function () {
    var zoomNumber = getZoomNumber();
    if (zoomNumber === MAX_ZOOM) {
      return;
    }
    zoomNumber += STEP_ZOOM;
    zoomLevel.value = zoomNumber + '%';
    zoomPicture(zoomNumber);
  };

  var onZoomMinusClick = function () {
    var zoomNumber = getZoomNumber();
    if (zoomNumber === MIN_ZOOM) {
      return;
    }
    zoomNumber -= STEP_ZOOM;
    zoomLevel.value = zoomNumber + '%';
    zoomPicture(zoomNumber);
  };

  window.zoom = {
    onZoomPlusClick: onZoomPlusClick,
    onZoomMinusClick: onZoomMinusClick
  };
})();
