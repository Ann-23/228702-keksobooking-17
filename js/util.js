'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  var mainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  window.util = {
    mainPin: mainPin,
    mainPinParams: mainPinParams
  };
})();
