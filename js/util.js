'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var onEscPress = function (evt, callback) {
    if (evt.keyCode === ESC_KEYCODE) {
      callback();
    }
  };

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
    onEscPress: onEscPress,
    disableFields: disableFields,
    enableFields: enableFields
  };
})();
