'use strict';

(function () {

  var filteredData = [];
  var filterValue;

  var updatePins = function (serverData) {
    filteredData = serverData.filter(function (it) {
      return it.offer.type === filterValue;
    });

    return window.pin.getElements(filteredData);
  };

  var houseFilter = document.querySelector('#housing-type');
  houseFilter.addEventListener('click', function () {
    filterValue = houseFilter.value;
    updatePins();
  });

  window.filters = {
    updatePins: updatePins
  };
})();
