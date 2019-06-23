'use strict';

(function () {
  var disableFields = function (fields) {
    fields.forEach(function (field) {
      field.disabled = true;
    });
  };

  var enableFields = function (fields) {
    fields.forEach(function (field) {
      field.disabled = false;
    });
  };

  window.util = {
    disableFields: disableFields,
    enableFields: enableFields
  };
})();
