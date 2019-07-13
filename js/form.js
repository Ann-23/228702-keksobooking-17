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
    window.util.disableFields(adFormFields);
    window.photos.clearPhotoFields();
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

  fieldType.addEventListener('change', function () {
    onFieldTypeChange(fieldType.value.toUpperCase());
  });

  // блок по синхронизации полей со временем заезда/выезда
  var onFieldTimeChange = function (field, value) {
    field.value = value;
  };

  fieldTimeOut.addEventListener('change', function () {
    onFieldTimeChange(fieldTimeIn, fieldTimeOut.value);
  });

  fieldTimeIn.addEventListener('change', function () {
    onFieldTimeChange(fieldTimeOut, fieldTimeIn.value);
  });

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
  };

  fieldRooms.addEventListener('change', function () {
    onFieldRoomsChange(fieldRooms.value);
    onFieldGuestsValidity(fieldRooms.value);
  });

  var onSuccess = function () {
    window.page.deactivate();
    window.modal.showModal();
  };

  var onError = function (errorMessage) {
    window.modal.showModal(errorMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onSuccess, onError);
  });

  // сброс по кнопке "резет"
  var resetForm = function () {
    disableForm();
    adForm.reset();
  };

  resetButton.addEventListener('click', function () {
    window.page.deactivate();
  });

  window.form = {
    setAddress: setAddress,
    init: enableForm,
    reset: resetForm
  };
})();
