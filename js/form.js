'use strict';

(function () {

  var TypePrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var GuestsByRoom = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var addressField = adForm.querySelector('#address');
  var fieldType = adForm.querySelector('#type');
  var fieldPrice = adForm.querySelector('#price');
  var fieldRooms = adForm.querySelector('#room_number');
  var fieldGuests = adForm.querySelector('#capacity');
  var optionsGuests = fieldGuests.querySelectorAll('option');
  var fieldTimeIn = adForm.querySelector('#timein');
  var fieldTimeOut = adForm.querySelector('#timeout');

  // заполняем адрес в неактивном состоянии
  var setAddress = function (x, y) {
    addressField.value = Math.floor(x) + ', ' + Math.floor(y);
  };

  // функция блокировки полей форм
  var disableForm = function () {
    adForm.classList.add('ad-form--disabled');
    window.photos.clearPhotoFields();
    window.util.disableFields(adFormFields);
  };

  disableForm();

  // функция разблокировки полей форм
  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.enableFields(adFormFields);
  };

  // синхронизация полей тип жилья/стоимость
  var onFieldTypeChange = function (type) {
    fieldPrice.min = TypePrice[type];
    fieldPrice.placeholder = TypePrice[type];
  };

  var onTypeChange = function () {
    onFieldTypeChange(fieldType.value.toUpperCase());
  };

  fieldType.addEventListener('change', onTypeChange);

  // блок по синхронизации полей со временем заезда/выезда
  var onFieldTimeChange = function (field, value) {
    field.value = value;
  };

  var onTimeOutChange = function () {
    onFieldTimeChange(fieldTimeOut, fieldTimeIn.value);
  };

  var onTimeInChange = function () {
    onFieldTimeChange(fieldTimeOut, fieldTimeIn.value);
  };

  fieldTimeOut.addEventListener('change', onTimeOutChange);

  fieldTimeIn.addEventListener('change', onTimeInChange);

  // синхронизация полей количества комнат и гостей
  var onFieldRoomsChange = function (value) {
    var availableOptions = GuestsByRoom[value];
    optionsGuests.forEach(function (option) {
      option.disabled = availableOptions.indexOf(option.value) === -1;
    });
  };

  var onFieldGuestsValidity = function (value) {
    var availableOptions = GuestsByRoom[value];
    if (availableOptions.indexOf(fieldGuests.value) === -1) {
      fieldGuests.setCustomValidity('Укажите другое количество гостей');
    }
    fieldGuests.addEventListener('change', function () {
      if (availableOptions.indexOf(fieldGuests.value) !== -1) {
        fieldGuests.setCustomValidity('');
      }
    });
  };

  var onRoomsGuestsChange = function () {
    onFieldRoomsChange(fieldRooms.value);
    onFieldGuestsValidity(fieldRooms.value);
  };

  fieldRooms.addEventListener('change', onRoomsGuestsChange);

  var onSuccess = function () {
    window.page.deactivate();
    window.modal.showModal();
  };

  var onError = function (errorMessage) {
    window.modal.showModal(errorMessage);
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onSuccess, onError);
  };

  adForm.addEventListener('submit', onSubmit);

  resetButton.addEventListener('click', window.page.deactivate);

  var removeOptionsListeners = function () {
    fieldType.removeEventListener('change', onTypeChange);
    fieldTimeOut.removeEventListener('change', onTimeOutChange);
    fieldTimeIn.removeEventListener('change', onTimeInChange);
    fieldRooms.removeEventListener('change', onRoomsGuestsChange);
    adForm.removeEventListener('submit', onSubmit);
    resetButton.removeEventListener('click', window.page.deactivate);
  };

  // сброс по кнопке "резет"
  var resetForm = function () {
    disableForm();
    adForm.reset();
    adForm.removeEventListener('submit', onSubmit);
    resetButton.removeEventListener('click', window.page.deactivate);
  };

  window.form = {
    setAddress: setAddress,
    init: enableForm,
    reset: resetForm,
    removeOptionsListeners: removeOptionsListeners
  };
})();
