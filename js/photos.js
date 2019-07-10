'use strict';

(function () {

  var PHOTO_WIDTH = '70';
  var PHOTO_HEIGHT = '70';
  var PHOTO_ALT = 'Фото жилья';
  var AVATAR_STUB = 'img/muffin-grey.svg';

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');

  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var headerDropZone = document.querySelector('.ad-form-header__drop-zone');
  var dropZone = document.querySelector('.ad-form__drop-zone');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];

    if (checkFileType) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', function (evt) {

    var files = evt.target.files;

    var matches = Array.from(files).filter(checkFileType);
    if (matches) {
      matches.forEach(loadPhoto);
    }
  });

  // добавление аватара и фото перетаскиванием
  headerDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  headerDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];

    if (checkFileType) {
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

    var matches = Array.from(files).filter(checkFileType);
    if (matches) {
      matches.forEach(loadPhoto);
    }
  }, false);

  var checkFileType = function (file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  };

  var loadPhoto = function (file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var element = document.createElement('img');
      previewPhoto.appendChild(element);

      element.src = reader.result;
      element.width = PHOTO_WIDTH;
      element.height = PHOTO_HEIGHT;
      element.alt = PHOTO_ALT;
    });

    reader.readAsDataURL(file);
  };

  var clearPhotoFields = function () {
    previewAvatar.src = AVATAR_STUB;
    while (previewPhoto.firstChild) {
      previewPhoto.firstChild.remove();
    }
  };

  window.photos = {
    clearPhotoFields: clearPhotoFields
  };
})();
