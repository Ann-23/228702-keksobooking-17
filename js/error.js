'use strict';

(function () {
  var mainArea = document.querySelector('main');

  var similarErrorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var errorDisplay = similarErrorTemplate.cloneNode(true);

  var closeError = function () {
    mainArea.removeChild(errorDisplay);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorEscPress = function (evt) {
    window.util.onEscPress(evt, closeError);
  };

  window.showError = function (errorMessage) {
    errorDisplay.querySelector('p').textContent = errorMessage;
    mainArea.appendChild(errorDisplay);
    document.addEventListener('keydown', onErrorEscPress);
  };

  errorDisplay.addEventListener('click', function () {
    closeError();
  });
})();
