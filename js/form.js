'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  var TypePrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var GuestsByRoom = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var mainPinCoords = window.getMainPinCoords();

  // заполняем адрес в неактивном состоянии
  var addressField = adForm.querySelector('#address');
  window.setAddress = function (x, y, height) {
    addressField.placeholder = Math.floor(x + window.util.mainPinParams.WIDTH / 2) + ', ' + Math.floor((y + height));
    addressField.value = Math.floor(x + window.util.mainPinParams.WIDTH / 2) + ', ' + Math.floor((y + height));
  };

  window.setAddress(mainPinCoords.mainPinX, mainPinCoords.mainPinY, window.util.mainPinParams.START_HEIGHT / 2);

  // функция блокировки форм
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters');
  var filtersFormSelects = filtersForm.querySelectorAll('select');

  // функция блокировки полей форм
  var disableFields = function (form, fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = true;
    }
  };

  disableFields(adForm, adFormFieldsets);
  disableFields(filtersForm, filtersFormSelects);

  // функция разблокировки полей форм
  var enableFields = function (form, fields) {
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = false;
    }
  };

  enableFields(adForm, adFormFieldsets);
  enableFields(filtersForm, filtersFormSelects);

  // синхронизация полей тип жилья/стоимость
  var fieldType = adForm.querySelector('#type');
  var fieldPrice = adForm.querySelector('#price');

  var onFieldTypeChange = function (type) {
    fieldPrice.min = TypePrice[type];
    fieldPrice.placeholder = TypePrice[type];
  };

  fieldType.addEventListener('change', function () {
    onFieldTypeChange(fieldType.value.toUpperCase());
  });

  // блок по синхронизации полей со временем заезда/выезда
  var fieldTimeIn = adForm.querySelector('#timein');
  var fieldTimeOut = adForm.querySelector('#timeout');

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
  var fieldRooms = adForm.querySelector('#room_number');
  var fieldGuests = adForm.querySelector('#capacity');
  var optionsGuests = fieldGuests.querySelectorAll('option');

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

  fieldRooms.addEventListener('change', function () {
    onFieldRoomsChange(fieldRooms.value);
    onFieldGuestsValidity(fieldRooms.value);
  });
})();
