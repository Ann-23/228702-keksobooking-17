'use strict';

(function () {
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

  // заполняем адрес в неактивном состоянии
  var mainPinX = +window.mainPin.style.left.split('px')[0];
  var mainPinY = +window.mainPin.style.top.split('px')[0];
  window.address.placeholder = Math.floor(mainPinX + window.mainPinParams.WIDTH / 2) + ', ' + Math.floor((mainPinY + window.mainPinParams.START_HEIGHT / 2));

  // синхронизация полей тип жилья/стоимость
  var fieldType = window.window.window.adForm.querySelector('#type');
  var fieldPrice = window.window.window.adForm.querySelector('#price');

  var onFieldTypeChange = function (type) {
    fieldPrice.min = TypePrice[type];
    fieldPrice.placeholder = TypePrice[type];
  };

  fieldType.addEventListener('change', function () {
    onFieldTypeChange(fieldType.value.toUpperCase());
  });

  // блок по синхронизации полей со временем заезда/выезда
  var fieldTimeIn = window.window.adForm.querySelector('#timein');
  var fieldTimeOut = window.window.adForm.querySelector('#timeout');

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
  var fieldRooms = window.adForm.querySelector('#room_number');
  var fieldGuests = window.adForm.querySelector('#capacity');
  var optionsGuests = fieldGuests.querySelectorAll('option');

  var onFieldRoomsChange = function (value) {
    var avaliableOptions = GuestsByRoom[value];
    optionsGuests.forEach(function (option) {
      option.disabled = avaliableOptions.indexOf(option.value) === -1;
    });
  };

  var onFieldGuestsValidate = function (value) {
    var avaliableOptions = GuestsByRoom[value];
    if (avaliableOptions.indexOf(fieldGuests.value) === -1) {
      fieldGuests.setCustomValidity('Укажите другое количество гостей');
    }
    fieldGuests.addEventListener('change', function () {
      if (avaliableOptions.indexOf(fieldGuests.value) !== -1) {
        fieldGuests.setCustomValidity('');
      }
    });
  };

  fieldRooms.addEventListener('change', function () {
    onFieldRoomsChange(fieldRooms.value);
    onFieldGuestsValidate(fieldRooms.value);
  });
})();
