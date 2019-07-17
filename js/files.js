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

  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');

  var checkFileType = function (file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  };

  var loadPhoto = function (file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      var element = document.createElement('img');
      element.src = reader.result;
      element.width = PHOTO_WIDTH;
      element.height = PHOTO_HEIGHT;
      element.alt = PHOTO_ALT;
      if (previewPhoto.querySelector('img')) {
        var elementContainer = document.createElement('div');
        elementContainer.classList.add('ad-form__photo');
        elementContainer.appendChild(element);
        var parentDiv = previewPhoto.parentNode;
        parentDiv.insertBefore(elementContainer, previewPhoto.nextSibling);
      } else {
        previewPhoto.appendChild(element);
      }
    });
    reader.readAsDataURL(file);
  };

  var clearPhotoFields = function () {
    previewAvatar.src = AVATAR_STUB;
    while (previewPhoto.firstChild) {
      previewPhoto.firstChild.remove();
    }
  };

  // добавление аватара и фото выбором
  var onAvatarChange = function () {
    var file = avatarChooser.files[0];
    if (checkFileType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onPhotoChange = function (evt) {
    var files = evt.target.files;
    var matches = Array.from(files).filter(checkFileType);
    if (matches) {
      matches.forEach(loadPhoto);
    }
  };

  // добавление аватара и фото перетаскиванием
  var onAvatarDragover = function (evt) {
    evt.preventDefault();
  };

  var onAvatarDrop = function (evt) {
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];
    if (checkFileType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onPhotoDragover = function (evt) {
    evt.preventDefault();
  };

  var onPhotoDrop = function (evt) {
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    var matches = Array.from(files).filter(checkFileType);
    if (matches) {
      matches.forEach(loadPhoto);
    }
  };

  var initFilesLoad = function () {
    avatarChooser.addEventListener('change', onAvatarChange);
    avatarDropZone.addEventListener('dragover', onAvatarDragover, false);
    avatarDropZone.addEventListener('drop', onAvatarDrop, false);

    photoChooser.addEventListener('change', onPhotoChange);
    photoDropZone.addEventListener('dragover', onPhotoDragover, false);
    photoDropZone.addEventListener('drop', onPhotoDrop, false);
  };

  var uninitFilesLoad = function () {
    avatarChooser.removeEventListener('change', onAvatarChange);
    avatarDropZone.removeEventListener('dragover', onAvatarDragover, false);
    avatarDropZone.removeEventListener('drop', onAvatarDrop, false);

    photoChooser.removeEventListener('change', onPhotoChange);
    photoDropZone.removeEventListener('dragover', onPhotoDragover, false);
    photoDropZone.removeEventListener('drop', onPhotoDrop, false);
  };

  window.files = {
    clear: clearPhotoFields,
    init: initFilesLoad,
    uninit: uninitFilesLoad
  };
})();
