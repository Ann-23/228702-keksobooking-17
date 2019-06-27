'use strict';

(function () {

  var map = document.querySelector('.map');
  var searchAreaWidth = map.clientWidth;
  var mainPin = document.querySelector('.map__pin--main');
  var similarPins = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');
  var similarErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorDisplay = similarErrorTemplate.cloneNode(true);

  var MainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  var YCoord = {
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
  window.form.setAddress(mainPinCoords.x + MainPinParams.WIDTH / 2, mainPinCoords.y + MainPinParams.START_HEIGHT / 2);

  var successHandler = function (data) {
    similarPins.appendChild(window.getPinElements(data));
  };

  var errorHandler = function (errorMessage) {
    window.modal.showModal(errorDisplay, errorMessage);
    window.modal.modalListener(errorDisplay);
  };

  // функция вызова активго состояния страницы
  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.enable();
    window.backend.load(successHandler, errorHandler);
  };

  // логика активации и перемещений
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var activate = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (!activate) {
        activatePage();
      }
      activate = true;

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
        min: YCoord.MIN - MainPinParams.HEIGHT,
        max: YCoord.MAX - MainPinParams.HEIGHT
      };

      var xCoordRange = {
        min: 0,
        max: searchAreaWidth - MainPinParams.WIDTH
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

      window.form.setAddress(xNew + MainPinParams.WIDTH / 2, yNew + MainPinParams.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      window.form.setAddress(mainPinCoords.x + MainPinParams.WIDTH / 2, mainPinCoords.y + MainPinParams.HEIGHT);

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

  var onCloseButtonClick = function (element) {
    var buttonClose = element.querySelector('button');
    buttonClose.addEventListener('click', function () {
      map.removeChild(element);
      var pins = similarPins.querySelectorAll('.map__pin--active');
      for (var i = 0; i < pins.length; i++) {
        pins[i].classList.remove('map__pin--active');
      }
    });
  };

  var showCard = function (ad) {
    var cardElement = window.renderCard(ad);
    map.insertBefore(cardElement, filtersContainer);
    onCloseButtonClick(cardElement);
  };

  window.map = {
    showCard: showCard
  };
})();
