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
    window.files.clear();
    window.files.uninit();
    fieldPrice.placeholder = TypePrice[fieldType.value.toUpperCase()];
  };

  disableForm();

  // функция разблокировки полей форм
  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.enableFields(adFormFields);
    window.files.init();
  };

  // синхронизация полей тип жилья/стоимость
  var onFieldTypeChange = function (type) {
    fieldPrice.min = TypePrice[type];
    fieldPrice.placeholder = TypePrice[type];
  };

  fieldType.addEventListener('change', function () {
    onFieldTypeChange(fieldType.value.toUpperCase());
  });

  // синхронизация полей со временем заезда/выезда
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
  var setGuestsValidity = function (options) {
    var message = '';

    if (options.indexOf(fieldGuests.value) === -1) {
      message = 'Укажите другое количество гостей';
    }
    fieldGuests.setCustomValidity(message);
  };

  var onFieldRoomsChange = function (evt) {
    var value = evt.target.value;
    var availableOptions = GuestsByRoom[value];
    optionsGuests.forEach(function (option) {
      option.disabled = availableOptions.indexOf(option.value) === -1;
    });
    setGuestsValidity(availableOptions, value);
  };

  var onFieldGuestsChange = function (evt) {
    var value = evt.target.value;
    var availableOptions = GuestsByRoom[fieldRooms.value];
    setGuestsValidity(availableOptions, value);
  };

  fieldRooms.addEventListener('change', onFieldRoomsChange);
  fieldGuests.addEventListener('change', onFieldGuestsChange);

  var onSuccess = function () {
    window.card.remove();
    window.page.deactivate();
    window.popup.show();
  };

  var onError = function (errorMessage) {
    window.popup.show(errorMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onSuccess, onError);
  });

  // сброс по кнопке "резет"
  var resetForm = function () {
    window.card.remove();
    disableForm();
    adForm.reset();
  };

  resetButton.addEventListener('click', function () {
    window.page.deactivate();
  });

  window.form = {
    address: setAddress,
    init: enableForm,
    reset: resetForm
  };
})();
