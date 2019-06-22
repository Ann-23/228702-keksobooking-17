'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var searchAreaWidth = map.clientWidth;
  var similarPins = document.querySelector('.map__pins');

  var pinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var yCord = {
    MIN: 130,
    MAX: 630
  };

  // функции получения координат главного пина и их экспорт
  window.getMainPinX = function () {
    return +mainPin.style.left.split('px')[0];
  };
  window.getMainPinY = function () {
    return +mainPin.style.top.split('px')[0];
  };

  var mainPinX = window.getMainPinX();
  var mainPinY = window.getMainPinY();

  // функция вызова активго состояния страницы
  var activatePage = function () {
    map.classList.remove('map--faded');
    // тут вызов разблокировки форм
    similarPins.appendChild(window.createFragment());
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
      mainPin.style.left = xNew + 'px';

      if (yNew < yCoordRange.min) {
        yNew = yCoordRange.min;
      }
      if (yNew > yCoordRange.max) {
        yNew = yCoordRange.max;
      }
      mainPin.style.top = yNew + 'px';

      window.setAddress(xNew, yNew, window.util.mainPinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      window.setAddress(mainPinX, mainPinY, window.util.mainPinParams.HEIGHT);

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

  /* var card = {
    show: function (ad) {
      var newElement = window.renderCard(ad);
      var referenceElement = document.querySelector('.map__filters-container');
      map.insertBefore(newElement, referenceElement);
    },
    hide: function () {}
  }; */
})();
