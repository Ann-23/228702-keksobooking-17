'use strict';

(function () {
  var mainArea = document.querySelector('main');

  var closeModal = function (modal) {
    mainArea.removeChild(modal);
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    window.util.onEscPress(evt, closeModal);
  };

  var showModal = function (modal, errorMessage) {
    modal.querySelector('p').textContent = errorMessage;
    mainArea.appendChild(modal);
    document.addEventListener('keydown', onEscPress);
  };

  var modalListener = function (modal) {
    modal.addEventListener('click', function () {
      closeModal();
    });
  };

  window.modal = {
    showModal: showModal,
    modalListener: modalListener
  };
})();
