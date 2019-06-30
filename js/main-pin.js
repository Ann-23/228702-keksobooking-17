'use strict';

(function () {
  var MainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  var XCoord = {
    MIN: 0,
    MAX: 1200
  };

  var YCoord = {
    MIN: 130,
    MAX: 630
  };

  var xCoordRange = {
    min: 0,
    max: XCoord.MAX - MainPinParams.WIDTH
  };

  var yCoordRange = {
    min: YCoord.MIN - MainPinParams.HEIGHT,
    max: YCoord.MAX - MainPinParams.HEIGHT
  };

  var mainPin = document.querySelector('.map__pin--main');

  // функции получения координат главного пина
  var getMainPinCoords = function () {
    return {
      x: +mainPin.style.left.split('px')[0],
      y: +mainPin.style.top.split('px')[0]
    };
  };

  var pinInitCoord = getMainPinCoords();

  // исходные координаты в поле адреса
  window.form.setAddress(pinInitCoord.x + MainPinParams.WIDTH / 2, pinInitCoord.y + MainPinParams.START_HEIGHT / 2);

  var initMainPin = function () {
    mainPin.style.left = pinInitCoord.x + 'px';
    mainPin.style.top = pinInitCoord.y + 'px';

    window.form.setAddress(pinInitCoord.x + MainPinParams.WIDTH / 2, pinInitCoord.y + MainPinParams.START_HEIGHT / 2);
  };

  // логика активации и перемещений
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      window.form.setAddress(xNew + MainPinParams.WIDTH / 2, yNew + MainPinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.page.activate();

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    initMainPin: initMainPin
  };
})();
