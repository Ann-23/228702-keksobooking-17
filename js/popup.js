'use strict';

(function () {
  var mainArea = document.querySelector('main');

  var similarSuccessTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var similarErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorDisplay = similarErrorTemplate.cloneNode(true);

  var successDisplay = similarSuccessTemplate.cloneNode(true);

  var closeModal = function () {
    var modal = mainArea.querySelector('.modal');
    modal.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', closeModal);
  };

  var onEscPress = function (evt) {
    window.util.onEscPress(evt, closeModal);
  };

  var showModal = function (errorMessage) {
    if (errorMessage) {
      errorDisplay.querySelector('p').textContent = errorMessage;
      mainArea.appendChild(errorDisplay);
    } else {
      mainArea.appendChild(successDisplay);
    }
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', closeModal);
  };

  window.popup = {
    show: showModal
  };
})();
