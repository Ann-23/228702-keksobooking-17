'use strict';

(function () {
  window.map = document.querySelector('.map');
  window.adForm = document.querySelector('.ad-form');
  window.address = window.adForm.querySelector('#address');
  window.searchAreaWidth = window.map.clientWidth;

  window.ADS_AMOUNT = 8;

  window.yCord = {
    MIN: 130,
    MAX: 630
  };

  window.pinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  window.mainPinParams = {
    WIDTH: 65,
    HEIGHT: 81,
    START_HEIGHT: 65
  };

  window.AccommodationType = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
})();
