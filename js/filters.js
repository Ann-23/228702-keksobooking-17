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
  var mapFeatures = document.querySelector('.map__features');
  var featuresFilter = mapFeatures.querySelectorAll('input[type=checkbox]');

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

    filterPinsByFeatures(getCheckedFeatures());
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

  // отфильтруй из объявлений те, у которых массив ads.offer.features
  // содержит все элементы массива чекнутых фич-чекбоксов

  var filterPinsByFeatures = function (features) {
    var newAds;
    newAds = filteredAds.filter(function (it) {
      var pinsFeatures = it.offer.features;
      if (pinsFeatures.length !== 0) {
        console.log(pinsFeatures);
        for (var i = 0; i < features.length; i++) {
          return pinsFeatures.indexOf(features[i]) !== -1
        }
      }
      console.log(newAds);
    });
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

  console.log(getCheckedFeatures());

  window.filters = {
    initFilters: initFilters
  };
})();
