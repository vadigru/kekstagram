'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.img-upload__form');
  var fileChooserPhoto = form.querySelector('input[type="file"]');
  var preview = document.querySelector('.img-upload__preview img');
  var previewPreset = document.querySelectorAll('.effects__preview');


  // clear preview of uploaded image ------------------------------------------
  var clearPreview = function () {
    preview.src = '';
    previewPreset.forEach(function (item) {
      item.style.backgroundImage = '';
    });
  };

  // create preview of uploaded image ---------------------------------------
  var createPreview = function () {
    var file = fileChooserPhoto.files[0];
    if (!file) {
      return;
    }
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        clearPreview();
        preview.src = reader.result;
        previewPreset.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });

      });
      reader.readAsDataURL(file);
    }
  };

  // delay opening of picture edit --------------------------------------------
  var delayShowPictureEdit = function () {
    setTimeout(function () {
      window.popup.showPictureEdit();
    }, 100);
  };

  form.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target === fileChooserPhoto) {
      clearPreview();
      createPreview();
      delayShowPictureEdit();
    }
  });

  window.upload = {
    clearPreview: clearPreview,
    createPreview: createPreview
  };
})();
