'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters');
  var filtersFormSelects = filtersForm.querySelectorAll('select');
  var resetButton = adForm.querySelector('.ad-form__reset');

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
  var addressField = adForm.querySelector('#address');
  var setAddress = function (x, y) {
    addressField.value = Math.floor(x) + ', ' + Math.floor(y);
  };

    // функция блокировки полей форм
  var disableForm = function () {
    adForm.classList.add('ad-form--disabled');
    window.util.disableFields(adFormFields);
    window.util.disableFields(filtersFormSelects);
  };

  disableForm();

  // функция разблокировки полей форм
  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.enableFields(adFormFields);
    window.util.enableFields(filtersFormSelects);
  };

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

  var modalHandler = function (errorMessage) {
    window.modal.showModal(errorMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.map.deactivatePage(adForm);
    window.upload(new FormData(adForm), modalHandler(), modalHandler());
  });

  // сброс по кнопке "резет"
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.deactivatePage(adForm);
  });

  window.form = {
    setAddress: setAddress,
    disable: disableForm,
    enable: enableForm
  };
})();
