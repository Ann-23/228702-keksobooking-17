'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500; // ms

  var onEscPress = function (evt, callback) {
    if (evt.keyCode === ESC_KEYCODE) {
      callback();
    }
  };

  var onEnterPress = function (evt, callback) {
    if (evt.keyCode === ENTER_KEYCODE) {
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

  var reduceDebounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    onEscPress: onEscPress,
    onEnterPress: onEnterPress,
    disableFields: disableFields,
    enableFields: enableFields,
    reduceDebounce: reduceDebounce
  };
})();
