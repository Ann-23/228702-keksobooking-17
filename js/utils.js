'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');

  var mainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  window.util = {
    map: map,
    mainPin: mainPin,
    adForm: adForm,
    mainPinParams: mainPinParams
  };
})();
