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

  var isCursorMove = false;

  // функция получения координат главного пина
  var getMainPinCoords = function () {
    return {
      x: +mainPin.style.left.split('px')[0],
      y: +mainPin.style.top.split('px')[0]
    };
  };

  var pinInitCoord = getMainPinCoords();

  // исходные координаты в поле адреса
  window.form.address(pinInitCoord.x + MainPinParams.WIDTH / 2, pinInitCoord.y + MainPinParams.START_HEIGHT / 2);

  var initMainPin = function () {
    mainPin.style.left = pinInitCoord.x + 'px';
    mainPin.style.top = pinInitCoord.y + 'px';

    window.form.address(pinInitCoord.x + MainPinParams.WIDTH / 2, pinInitCoord.y + MainPinParams.START_HEIGHT / 2);
  };

  // функция-конструктор координат отсчёта
  var StartCoords = function (x, y) {
    this.x = x;
    this.y = y;
  };

  // логика активации и перемещений
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = new StartCoords(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      isCursorMove = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = new StartCoords(moveEvt.clientX, moveEvt.clientY);

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

      window.form.address(xNew + MainPinParams.WIDTH / 2, yNew + MainPinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (isCursorMove === false) {
        window.form.address(pinInitCoord.x + MainPinParams.WIDTH / 2, pinInitCoord.y + MainPinParams.HEIGHT);
      }

      window.page.activate();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onMainPinEnter = function (evt) {
    window.util.onEnterPress(evt, window.page.activate);
    mainPin.removeEventListener('keydown', onMainPinEnter);
  };

  mainPin.addEventListener('keydown', onMainPinEnter);

  window.pin = {
    init: initMainPin
  };
})();
