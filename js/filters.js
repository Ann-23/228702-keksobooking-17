'use strict';

(function () {

  var PriceParams = {
    LOW: 10000,
    HIGH: 50000
  };

  var initialAds;
  var filteredAds;
  var typeFilter = document.querySelector('#housing-type');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var priceFilter = document.querySelector('#housing-price');
  var featuresFilter = document.querySelectorAll('input[type=checkbox]');

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

    filterPinsByFeatures(ads, getCheckedFeatures());
  };

  var filterPinsByType = function (value) {
    var newAds;
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
    var newAds;
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
    var newAds;
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
    var newAds;
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

  var filterPinsByFeatures = function (ads, features) {
    var newAds = [];
    for (var i = 0; i < features.length; i++) {
      var pinsArr = ads[i].offer.features;
      if (pinsArr.indexOf(features[i]) !== -1) {
        newAds.push(ads[i]);
      }
    }
    window.pin.showPins(newAds);
  };

  var getCheckedFeatures = function () {
    for (var i = 0; i < featuresFilter.length; i++) {
      var checkedFeatures = [];
      featuresFilter[i].addEventListener('change', function (evt) {
        var value = evt.target.value;
        checkedFeatures.push(value);
      });
    }
    return checkedFeatures;
  };

  window.filters = {
    initFilters: initFilters
  };
})();
