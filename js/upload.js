'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.img-upload__form');
  var fileChooserPhoto = form.querySelector('input[type="file"]');
  var preview = document.querySelector('.img-upload__preview img');
  var previewPresets = document.querySelectorAll('.effects__preview');

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
    if (!matches) {
      var pictureUpload = document.querySelector('#upload-file');
      window.modal.showModalError('Неподходящий тип файла.');
      pictureUpload.value = '';
    }
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        previewPresets.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        window.popup.showPictureEdit();
      });
      reader.readAsDataURL(file);
    }
  };

  form.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target === fileChooserPhoto) {
      createPreview();
    }
  });
})();
