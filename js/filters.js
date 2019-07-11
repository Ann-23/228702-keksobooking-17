'use strict';

(function () {

  var PriceParams = {
    LOW: 10000,
    HIGH: 50000
  };

  var initialAds;
  var filteredAds;
  var newAds;
  var typeFilter = document.querySelector('#housing-type');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var priceFilter = document.querySelector('#housing-price');
  var mapFeatures = document.querySelector('.map__features');

  var initFilters = function (ads) {
    initialAds = ads;
    filteredAds = ads;

    typeFilter.addEventListener('change', addCheckDebounce);
    roomsFilter.addEventListener('change', addCheckDebounce);
    guestsFilter.addEventListener('change', addCheckDebounce);
    priceFilter.addEventListener('change', addCheckDebounce);
    mapFeatures.addEventListener('change', addCheckDebounce);

    window.pin.showPins(initialAds);
  };

  var filtersState = {
    'housing-type': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'housing-price': 'any',
    'features': []
  };

  var onFilterChange = function (evt) {
    var name = evt.target.name;
    var value = evt.target.value;

    if (name === 'features') {
      var checkboxes = mapFeatures.querySelectorAll('input[type=checkbox]:checked');
      filtersState[name] = [];
      checkboxes.forEach(function (it) {
        filtersState[name].push(it.value);
      });
    } else {
      filtersState[name] = value;
    }

    window.card.remove();
    filterAds();
  };

  var addCheckDebounce = window.util.reduceDebounce(onFilterChange);

  var filterAds = function () {
    filteredAds = initialAds;

    filteredAds = filterPinsByType();
    filteredAds = filterPinsByRooms();
    filteredAds = filterPinsByGuests();
    filteredAds = filterPinsByPrice();
    filteredAds = filterPinsByFeatures();

    window.pin.showPins(filteredAds);
  };

  var filterPinsByType = function () {
    var value = filtersState['housing-type'];
    if (value === 'any') {
      newAds = initialAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        return it.offer.type === value;
      });
    }
    return newAds;
  };

  var filterPinsByRooms = function () {
    var value = filtersState['housing-rooms'];
    if (value === 'any') {
      newAds = filteredAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        return it.offer.rooms === +value;
      });
    }
    return newAds;
  };

  var filterPinsByGuests = function () {
    var value = filtersState['housing-guests'];
    if (value === 'any') {
      newAds = filteredAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        return it.offer.guests === +value;
      });
    }
    return newAds;
  };

  var filterPinsByPrice = function () {
    var value = filtersState['housing-price'];
    if (value === 'any') {
      newAds = filteredAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        var valuePrice;
        if (checkPrice.low(it.offer.price)) {
          valuePrice = 'low';
        }
        if (checkPrice.high(it.offer.price)) {
          valuePrice = 'high';
        }
        if (checkPrice.middle(it.offer.price)) {
          valuePrice = 'middle';
        }
        return valuePrice === value;
      });
    }
    return newAds;
  };

  var checkPrice = {
    low: function (value) {
      return value < PriceParams.LOW;
    },
    high: function (value) {
      return value > PriceParams.HIGH;
    },
    middle: function (value) {
      return value <= PriceParams.HIGH && value >= PriceParams.LOW;
    }
  };

  var filterPinsByFeatures = function () {
    var features = filtersState['features'];
    if (features.length === 0) {
      newAds = filteredAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        var filtered;
        var pinsFeatures = it.offer.features;
        for (var i = 0; i < features.length; i++) {
          if (pinsFeatures.indexOf(features[i]) === -1) {
            filtered = false;
            break;
          }
          filtered = true;
        }
        return filtered;
      });
    }
    return newAds;
  };

  var removeListeners = function () {
    typeFilter.removeEventListener('change', addCheckDebounce);
    roomsFilter.removeEventListener('change', addCheckDebounce);
    guestsFilter.removeEventListener('change', addCheckDebounce);
    priceFilter.removeEventListener('change', addCheckDebounce);
    mapFeatures.removeEventListener('change', addCheckDebounce);
  };

  window.filters = {
    initFilters: initFilters,
    removeListeners: removeListeners
  };
})();
