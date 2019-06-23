'use strict';

(function () {

  var map = document.querySelector('.map');
  var searchAreaWidth = map.clientWidth;
  var mainPin = document.querySelector('.map__pin--main');
  var similarPins = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  var mainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  var yCoord = {
    MIN: 130,
    MAX: 630
  };

  // функции получения координат главного пина
  var getMainPinCoords = function () {
    return {
      x: +mainPin.style.left.split('px')[0],
      y: +mainPin.style.top.split('px')[0]
    };
  };

  var mainPinCoords = getMainPinCoords();

  // исходные координаты в поле адреса
  window.form.setAddress(mainPinCoords.x + mainPinParams.WIDTH / 2, mainPinCoords.y + mainPinParams.START_HEIGHT / 2);

  // функция вызова активго состояния страницы
  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.enable();
    similarPins.appendChild(window.load());
  };

  // логика активации и перемещений
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    activatePage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

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
        min: yCoord.MIN - mainPinParams.HEIGHT,
        max: yCoord.MAX - mainPinParams.HEIGHT
      };

      var xCoordRange = {
        min: 0,
        max: searchAreaWidth - mainPinParams.WIDTH
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

      window.form.setAddress(xNew + mainPinParams.WIDTH / 2, yNew + mainPinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      window.form.setAddress(mainPinCoords.x + mainPinParams.WIDTH / 2, mainPinCoords.y + mainPinParams.HEIGHT);

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

  var showCard = function (ad) {
    var cardElement = window.renderCard(ad);
    map.insertBefore(cardElement, filtersContainer);
  };

  window.map = {
    showCard: showCard
  };
})();
