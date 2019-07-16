'use strict';

(function () {

  var PriceParams = {
    LOW: 10000,
    HIGH: 50000
  };

  var initialAds;
  var filteredAds;
  var mapFilters = document.querySelector('.map__filters');
  var mapFeatures = document.querySelector('.map__features');

  var initFilters = function (ads) {
    initialAds = ads;
    filteredAds = ads;

    mapFilters.addEventListener('change', window.util.reduceDebounce(onFilterChange));

    window.pins.show(initialAds);
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

  var filterAds = function () {
    filteredAds = initialAds;

    filteredAds = filterBySelect('housing-type');
    filteredAds = filterBySelect('housing-rooms');
    filteredAds = filterBySelect('housing-guests');
    filteredAds = filterPinsByPrice();
    filteredAds = filterPinsByFeatures();

    window.pins.show(filteredAds);
  };

  var filterBySelect = function (stateName) {
    var name = stateName.replace('housing-', '');

    var value = filtersState[stateName];
    if (value === 'any') {
      return filteredAds;
    } else {
      return filteredAds.filter(function (it) {
        return it.offer[name].toString() === value;
      });
    }
  };

  var filterPinsByPrice = function () {
    var value = filtersState['housing-price'];
    if (value === 'any') {
      return filteredAds;
    }
    return filteredAds.filter(function (it) {
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
      return filteredAds;
    }
    return filteredAds.filter(function (it) {
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
  };

  window.filters = {
    init: initFilters
  };
})();
