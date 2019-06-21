'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var similarPins = document.querySelector('.map__pins');
  // находим шаблон меток в template
  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  // функция вставки шаблона метки
  var renderPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - window.pinParams.WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - window.pinParams.HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    return pinElement;
  };

  var ads = window.generateAds(window.ADS_AMOUNT);

  // функция создания фрагмента для меток
  var createFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }
    return fragment;
  };

  // функция разблокировки полей форм
  var enableFields = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = false;
    }
  };

  // функция блокировки полей форм
  var disableFields = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = true;
    }
  };

  // находим формы и блокируем их поля
  var adFormFieldsets = window.adForm.querySelectorAll('fieldset');
  disableFields(adFormFieldsets);

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormSelects = filtersForm.querySelectorAll('select');
  disableFields(filtersFormSelects);

  // функция вызова активго состояния страницы
  var activatePage = function () {
    window.map.classList.remove('map--faded');
    window.adForm.classList.remove('ad-form--disabled');
    enableFields(adFormFieldsets);
    enableFields(filtersFormSelects);
    similarPins.appendChild(createFragment());
  };

  // логика активации и перемещений
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    activatePage();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var xNew = mainPin.offsetLeft - shift.x;
      var yNew = mainPin.offsetTop - shift.y;

      var yCoordRange = {
        min: window.yCord.MIN - window.mainPinParams.HEIGHT,
        max: window.yCord.MAX - window.mainPinParams.HEIGHT
      };

      var xCoordRange = {
        min: 0,
        max: window.searchAreaWidth - window.pinParams.WIDTH
      };

      if (xNew < xCoordRange.min) {
        xNew = xCoordRange.min;
      }
      if (xNew > xCoordRange.max) {
        xNew = xCoordRange.max;
      }
      mainPin.style.left = xNew + 'px';

      if (yNew < yCoordRange.min) {
        yNew = yCoordRange.min;
      }
      if (yNew > yCoordRange.max) {
        yNew = yCoordRange.max;
      }
      mainPin.style.top = yNew + 'px';

      window.address.placeholder = Math.floor(xNew + window.mainPinParams.WIDTH / 2) + ', ' + Math.floor(yNew + window.mainPinParams.HEIGHT);
      window.address.value = Math.floor(xNew + window.mainPinParams.WIDTH / 2) + ', ' + Math.floor(yNew + window.mainPinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      window.address.placeholder = Math.floor(+mainPin.style.left.split('px')[0] + window.mainPinParams.WIDTH / 2) + ', ' + Math.floor(+mainPin.style.top.split('px')[0] + window.mainPinParams.HEIGHT);
      window.address.value = Math.floor(+mainPin.style.left.split('px')[0] + window.mainPinParams.WIDTH / 2) + ', ' + Math.floor(+mainPin.style.top.split('px')[0] + window.mainPinParams.HEIGHT);

      window.map.removeEventListener('mousemove', onMouseMove);
      window.map.removeEventListener('mouseup', onMouseUp);
    };

    window.map.addEventListener('mousemove', onMouseMove);
    window.map.addEventListener('mouseup', onMouseUp);
  });
})();
