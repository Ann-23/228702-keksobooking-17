'use strict';

(function () {

  var initialAds;
  var filteredAds;
  var typeFilter = document.querySelector('#housing-type');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');

  var initFilters = function (ads) {
    initialAds = ads;
    filteredAds = ads;

    typeFilter.addEventListener('change', function (evt) {
      var type = evt.target.value;
      filterPinsByType(type);
    });

    roomsFilter.addEventListener('change', function (evt) {
      var type = evt.target.value;
      filterPinsByRooms(type);
    });

    guestsFilter.addEventListener('change', function (evt) {
      var value = evt.target.value;
      filterPinsByGuests(value);
    });
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

  window.filters = {
    initFilters: initFilters
  };
})();
