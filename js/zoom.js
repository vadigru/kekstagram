'use strict';
(function () {
  var pictureEdit = document.querySelector('.img-upload__overlay');
  var picturePreview = pictureEdit.querySelector('.img-upload__preview img');
  var zoom = pictureEdit.querySelector('.scale');
  var zoomLevel = zoom.querySelector('.scale__control--value');

  // picture scale handling -----------------------------------------------------
  var getZoomNumber = function () {
    return parseInt(zoomLevel.value.substring(0, zoomLevel.value.length - 1), 10);
  };

  var zoomPicture = function (num) {
    picturePreview.style.transform = 'scale(' + num / 100 + ')';
  };

  var onZoomPlusClick = function () {
    var zoomNumber = getZoomNumber();
    if (zoomNumber === window.const.MAX_ZOOM) {
      return;
    }
    zoomNumber += window.const.STEP_ZOOM;
    zoomLevel.value = zoomNumber + '%';
    zoomPicture(zoomNumber);
  };

  var onZoomMinusClick = function () {
    var zoomNumber = getZoomNumber();
    if (zoomNumber === window.const.MIN_ZOOM) {
      return;
    }
    zoomNumber -= window.const.STEP_ZOOM;
    zoomLevel.value = zoomNumber + '%';
    zoomPicture(zoomNumber);
  };

  window.zoom = {
    onZoomPlusClick: onZoomPlusClick,
    onZoomMinusClick: onZoomMinusClick
  };
})();
