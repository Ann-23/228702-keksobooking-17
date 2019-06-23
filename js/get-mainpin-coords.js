'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');

  window.getMainPinCoords = function () {
    var mainPinCoords = {};
    mainPinCoords.mainPinX = +mainPin.style.left.split('px')[0];
    mainPinCoords.mainPinY = +mainPin.style.top.split('px')[0];

    return mainPinCoords;
  };
})();
