'use strict';

(function () {
  var isActivate = false;

  // функция вызова активго состояния страницы
  var activatePage = function () {
    if (isActivate === false) {
      isActivate = true;
      window.map.activate();
      window.form.init();
    }
  };

  // функция вызова неактивного состояния страницы
  var deactivatePage = function () {
    isActivate = false;
    window.form.reset();
    window.map.deactivate();
  };

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };
})();
