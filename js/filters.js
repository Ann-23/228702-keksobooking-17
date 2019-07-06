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

  var filtersState = {
    typeFilter: typeFilter.value,
    roomsFilter: roomsFilter.value,
    guestsFilter: guestsFilter.value,
    priceFilter: priceFilter.value
  };

  var initFilters = function (ads) {
    initialAds = ads;
    filteredAds = ads;

    var filterPinsByType = function (value) {
      if (value === 'any') {
        newAds = initialAds;
      } else {
        newAds = filteredAds.filter(function (it) {
          return it.offer.type === value;
        });
      }
      return newAds;
    };

    filteredAds = filterPinsByType(filtersState.typeFilter);

    var filterPinsByRooms = function (value) {
      if (value === 'any') {
        newAds = initialAds;
      } else {
        newAds = filteredAds.filter(function (it) {
          return it.offer.rooms === +value;
        });
      }
      return newAds;
    };

    filteredAds = filterPinsByRooms(filtersState.roomsFilter);

    var filterPinsByGuests = function (value) {
      if (value === 'any') {
        newAds = initialAds;
      } else {
        newAds = filteredAds.filter(function (it) {
          return it.offer.guests === +value;
        });
      }
      return newAds;
    };

    filteredAds = filterPinsByGuests(filtersState.guestsFilter);

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

    filteredAds = filterPinsByPrice(filtersState.priceFilter);

    window.pin.showPins(filteredAds);
  };

  typeFilter.addEventListener('change', function (evt) {
    var value = evt.target.value;
    filtersState.typeFilter = value;
    initFilters(value);
  });

  roomsFilter.addEventListener('change', function (evt) {
    var value = evt.target.value;
    filtersState.roomsFilter = value;
    initFilters(value);
  });

  guestsFilter.addEventListener('change', function (evt) {
    var value = evt.target.value;
    filtersState.guestsFilter = value;
    initFilters(value);
  });

  priceFilter.addEventListener('change', function (evt) {
    var value = evt.target.value;
    filtersState.guestsFilter = value;
    initFilters(value);
  });

  /* var filterPinsByFeatures = function (value) {
    newAds = filteredAds.filter(function (it) {
      var pinsFeatures = it.offer.features;
      return pinsFeatures.indexOf(value) !== -1;
    });
    window.pin.showPins(newAds);
  }; */

  window.filters = {
    initFilters: initFilters
  };
})();
