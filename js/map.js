'use strict';

(function () {

  var map = document.querySelector('.map');

  var filtersContainer = document.querySelector('.map__filters-container');
  var filtersForm = filtersContainer.querySelector('.map__filters');
  var filtersFormSelects = filtersForm.querySelectorAll('select');
  var filtersFormInputs = filtersForm.querySelectorAll('input');

  window.pin.init();

  var successHandler = function (ads) {
    window.pins.show(ads);
    window.filters.init(ads);
  };

  var errorHandler = function (errorMessage) {
    window.popup.show(errorMessage);
  };

  // функция вызова активго состояния страницы
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.backend.load(successHandler, errorHandler);
    window.util.enableFields(filtersFormSelects);
    window.util.enableFields(filtersFormInputs);
  };

  // функция вызова нективного состояния страницы
  var deactivateMap = function () {
    map.classList.add('map--faded');
    window.util.disableFields(filtersFormSelects);
    window.util.disableFields(filtersFormInputs);
    window.pins.remove();
    window.pin.init();
  };

  deactivateMap();

  var closeCard = function () {
    window.card.remove();
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    window.util.onEscPress(evt, closeCard);
  };

  var showCard = function (ad) {
    var cardElement = window.card.render(ad);
    map.insertBefore(cardElement, filtersContainer);
    document.addEventListener('keydown', onEscPress);
  };

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    show: showCard
  };
})();
