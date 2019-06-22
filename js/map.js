'use strict';

(function () {
  var pinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var searchAreaWidth = window.util.map.clientWidth;
  var similarPins = document.querySelector('.map__pins');

  var yCord = {
    MIN: 130,
    MAX: 630
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
  var adFormFieldsets = window.util.adForm.querySelectorAll('fieldset');
  disableFields(adFormFieldsets);

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormSelects = filtersForm.querySelectorAll('select');
  disableFields(filtersFormSelects);

  // функция вызова активго состояния страницы
  var activatePage = function () {
    window.util.map.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
    enableFields(adFormFieldsets);
    enableFields(filtersFormSelects);
    similarPins.appendChild(window.createFragment());
  };

  // логика активации и перемещений
  window.util.mainPin.addEventListener('mousedown', function (evt) {
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

      var xNew = window.util.mainPin.offsetLeft - shift.x;
      var yNew = window.util.mainPin.offsetTop - shift.y;

      var yCoordRange = {
        min: yCord.MIN - window.util.mainPinParams.HEIGHT,
        max: yCord.MAX - window.util.mainPinParams.HEIGHT
      };

      var xCoordRange = {
        min: 0,
        max: searchAreaWidth - pinParams.WIDTH
      };

      if (xNew < xCoordRange.min) {
        xNew = xCoordRange.min;
      }
      if (xNew > xCoordRange.max) {
        xNew = xCoordRange.max;
      }
      window.util.mainPin.style.left = xNew + 'px';

      if (yNew < yCoordRange.min) {
        yNew = yCoordRange.min;
      }
      if (yNew > yCoordRange.max) {
        yNew = yCoordRange.max;
      }
      window.util.mainPin.style.top = yNew + 'px';

      window.address.placeholder = Math.floor(xNew + window.util.mainPinParams.WIDTH / 2) + ', ' + Math.floor(yNew + window.util.mainPinParams.HEIGHT);
      window.address.value = Math.floor(xNew + window.util.mainPinParams.WIDTH / 2) + ', ' + Math.floor(yNew + window.util.mainPinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      window.address.placeholder = Math.floor(+window.util.mainPin.style.left.split('px')[0] + window.util.mainPinParams.WIDTH / 2) + ', ' + Math.floor(+window.util.mainPin.style.top.split('px')[0] + window.util.mainPinParams.HEIGHT);
      window.address.value = Math.floor(+window.util.mainPin.style.left.split('px')[0] + window.util.mainPinParams.WIDTH / 2) + ', ' + Math.floor(+window.util.mainPin.style.top.split('px')[0] + window.util.mainPinParams.HEIGHT);

      window.util.map.removeEventListener('mousemove', onMouseMove);
      window.util.map.removeEventListener('mouseup', onMouseUp);
    };

    window.util.map.addEventListener('mousemove', onMouseMove);
    window.util.map.addEventListener('mouseup', onMouseUp);
  });
})();
