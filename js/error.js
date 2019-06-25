'use strict';

(function () {
  var mainArea = document.querySelector('main');

  var similarErrorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var errorDisplay = similarErrorTemplate.cloneNode(true);
  var errorCloseBtn = errorDisplay.querySelector('.error__button');

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeError();
    }
  };

  var closeError = function () {
    errorDisplay.classList.add('hidden');
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', closeError);
  };

  window.showError = function (errorMessage) {
    errorDisplay.querySelector('p').textContent = errorMessage;
    mainArea.appendChild(errorDisplay);
    document.addEventListener('keydown', onErrorEscPress);
    errorCloseBtn.addEventListener('click', closeError);
    errorDisplay.addEventListener('click', closeError);
  };
})();
