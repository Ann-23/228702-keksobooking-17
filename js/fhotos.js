'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview');

  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var headerDropZone = document.querySelector('.ad-form-header__drop-zone');
  var dropZone = document.querySelector('.ad-form__drop-zone');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.querySelector('img').src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', function (evt) {
    var files = evt.target.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        loadPhoto(file);
      }
    }
  });

  var loadPhoto = function (file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var element = document.createElement('img');
      previewPhoto.appendChild(element);

      element.src = reader.result;
      element.width = '70';
      element.height = '70';
      element.alt = 'Фото жилья';
    });

    reader.readAsDataURL(file);
  };

  // добавление аватара и фото перетаскиванием

  headerDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  headerDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.querySelector('img').src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }, false);

  dropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        loadPhoto(file);
      }
    }
  }, false);
})();
