'use strict';

(function () {

  var map = document.querySelector('.map');

  var filtersContainer = document.querySelector('.map__filters-container');
  var filtersForm = filtersContainer.querySelector('.map__filters');
  var filtersFormSelects = filtersForm.querySelectorAll('select');

  window.mainPin.initMainPin();

  var successHandler = function (ads) {
    window.pin.showPins(ads);
    window.filters.initFilters(ads);
  };

  var errorHandler = function (errorMessage) {
    window.modal.showModal(errorMessage);
  };

  // функция вызова активго состояния страницы
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.util.enableFields(filtersFormSelects);
    window.backend.load(successHandler, errorHandler);
  };

  // функция вызова нективного состояния страницы
  var deactivateMap = function () {
    map.classList.add('map--faded');
    window.util.disableFields(filtersFormSelects);
    window.pin.removeElements();
    window.mainPin.initMainPin();
  };

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
    showCard: showCard
  };
})();
