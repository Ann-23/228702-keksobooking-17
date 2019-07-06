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
  var filterWifi = mapFeatures.querySelector('#filter-wifi');
  var filterDishwasher = mapFeatures.querySelector('#filter-dishwasher');
  var filterParking = mapFeatures.querySelector('#filter-parking');
  var filterWasher = mapFeatures.querySelector('#filter-washer');
  var filterElevator = mapFeatures.querySelector('#filter-elevator');
  var filterConditioner = mapFeatures.querySelector('#filter-conditioner');

  var initFilters = function (ads) {
    initialAds = ads;
    filteredAds = ads;

    typeFilter.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByType(value);
    });

    roomsFilter.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByRooms(value);
    });

    guestsFilter.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByGuests(value);
    });

    priceFilter.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByPrice(value);
    });

    filterWifi.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByFeatures(value);
    });

    filterDishwasher.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByFeatures(value);
    });

    filterParking.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByFeatures(value);
    });

    filterWasher.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByFeatures(value);
    });

    filterElevator.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByFeatures(value);
    });

    filterConditioner.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByFeatures(value);
    });
  };

  var filterPinsByType = function (value) {
    if (value === 'any') {
      newAds = initialAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        return it.offer.type === value;
      });
    }
    window.pin.showPins(newAds);
  };

  var filterPinsByRooms = function (value) {
    if (value === 'any') {
      newAds = initialAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        return it.offer.rooms === +value;
      });
    }
    window.pin.showPins(newAds);
  };

  var filterPinsByGuests = function (value) {
    if (value === 'any') {
      newAds = initialAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        return it.offer.guests === +value;
      });
    }
    window.pin.showPins(newAds);
  };

  var filterPinsByPrice = function (value) {
    if (value === 'any') {
      newAds = initialAds;
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
    window.pin.showPins(newAds);
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

  var filterPinsByFeatures = function (value) {
    newAds = filteredAds.filter(function (it) {
      var pinsFeatures = it.offer.features;
      return pinsFeatures.indexOf(value) !== -1;
    });
    window.pin.showPins(newAds);
  };

  window.filters = {
    initFilters: initFilters
  };
})();
