'use strict';

(function () {

  var initialAds;
  var filteredAds;
  var houseFilter = document.querySelector('#housing-type');

  var initFilters = function (ads) {
    initialAds = ads;
    filteredAds = ads;

    houseFilter.addEventListener('change', function (evt) {
      var type = evt.target.value;
      filterPinsByType(type);
    });
  };

  var filterPinsByType = function (type) {
    var newAds;
    if (type === 'any') {
      newAds = initialAds;
    } else {
      newAds = filteredAds.filter(function (it) {
        return it.offer.type === type;
      });
    }
    window.pin.showPins(newAds);
  };

  window.filters = {
    initFilters: initFilters
  };
})();
