'use strict';

var ADS_AMOUNT = 8;

var yCord = {
  MIN: 130,
  MAX: 630
};

var pinParams = {
  WIDTH: 50,
  HEIGHT: 70
};

var mainPinParams = {
  WIDTH: 65,
  HEIGHT: 84,
  START_HEIGHT: 65
};

var offerParams = {
  TITLE: ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'],
  TIME: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var price = {
  MIN: 1000,
  MAX: 1000000
};

var rooms = {
  MIN: 1,
  MAX: 5
};

var guests = {
  MIN: 1,
  MAX: 6
};

var AccomodationType = {
  bungalo: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец'
};

var AccomodationPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var checkParams = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

// находим карту
var map = document.querySelector('.map');

// максимальное значение координаты X поля, где будут располагаться все метки
var searchAreaWidth = map.clientWidth;

// находим шаблон меток в template
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var similarPins = document.querySelector('.map__pins');

// находим шаблон карточки объявления в template
// var similarCardTemplate = document.querySelector('#card')
//    .content
//    .querySelector('.map__card');

// функция для получения рандомного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getAvatarImg = function (index) {
  var avatarIndex = index;
  if (index < 10) {
    avatarIndex = '0' + index;
  }
  return 'img/avatars/user' + avatarIndex + '.png';
};

var getRandomFeatures = function () {
  var features = [];
  var amount = getRandomNumber(1, offerParams.FEATURES.length);
  for (var i = 0; i < amount; i++) {
    features.push(offerParams.FEATURES[i]);
  }
  return features;
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var getSortPhotos = function () {
  offerParams.PHOTOS.sort(compareRandom);
  return offerParams.PHOTOS;
};

var getAccomodationType = function () {
  var typeObject = Object.keys(AccomodationType);
  var typeNumber = getRandomNumber(0, typeObject.length - 1);

  return typeObject[typeNumber];
};

// функция создания объявления
var getAd = function (index) {
  var ad = {
    author: {
      avatar: getAvatarImg(index)
    },
    offer: {
      title: offerParams.TITLE[index - 1],
      address: [getRandomNumber(pinParams.WIDTH / 2, searchAreaWidth - pinParams.WIDTH / 2), getRandomNumber(yCord.MIN, yCord.MAX)],
      price: getRandomNumber(price.MIN, price.MAX),
      rooms: getRandomNumber(rooms.MIN, rooms.MAX),
      guests: getRandomNumber(guests.MIN, guests.MAX),
      checkin: offerParams.TIME[getRandomNumber(0, offerParams.TIME.length)],
      checkout: offerParams.TIME[getRandomNumber(0, offerParams.TIME.length)],
      type: getAccomodationType(),
      features: getRandomFeatures(),
      description: '',
      photos: getSortPhotos()
    },
    location: {
      x: getRandomNumber(pinParams.WIDTH / 2, searchAreaWidth - pinParams.WIDTH / 2),
      y: getRandomNumber(yCord.MIN, yCord.MAX)
    }
  };
  return ad;
};

// функция создания массива с метками
var generateAds = function (amount) {
  var ads = [];
  for (var i = 0; i < amount; i++) {
    ads.push(getAd(i + 1));
  }
  return ads;
};

var ads = generateAds(ADS_AMOUNT);

// функция вставки шаблона метки
var renderPin = function (ad) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - pinParams.WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y - pinParams.HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

// функция создания фрагмента для меток
var createFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  return fragment;
};

/* // функция создания фрагмента фич для объявления
var createFeaturesFragment = function (featuers) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < featuers.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    var dopClass = 'popup__feature--' + featuers[i];
    featureElement.classList.add(dopClass);
    fragment.appendChild(featureElement);
  }
  return fragment;
};

// функция создания фрагмента фото для объявления
var createPhotosFragment = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = photos[i];
    photoElement.width = '45';
    photoElement.height = '40';
    photoElement.alt = 'Фотография жилья';
    fragment.appendChild(photoElement);
  }
  return fragment;
};

// функция вставки шаблона объявления
  var renderCard = function (ad) {
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  var cardTitle = cardElement.querySelector('.popup__title');
  cardTitle.textContent = ad.offer.title;

  var cardAddress = cardElement.querySelector('.popup__text--address');
  cardAddress.textContent = ad.offer.address;

  var cardPrice = cardElement.querySelector('.popup__text--price');
  cardPrice.textContent = ad.offer.price + ' ₽/ночь';

  var cardType = cardElement.querySelector('.popup__type');
  cardType.textContent = AccomodationType[ad.offer.type];

  var cardGuest = cardElement.querySelector('.popup__text--capacity');
  cardGuest.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

  var cardTime = cardElement.querySelector('.popup__text--time');
  cardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  var cardFeatuers = cardElement.querySelector('.popup__features');
  cardFeatuers.appendChild(createFeaturesFragment(ad.offer.features));

  var cardDescription = cardElement.querySelector('.popup__description');
  cardDescription.textContent = ad.offer.description;

  var cardPhotos = cardElement.querySelector('.popup__photos');
  cardPhotos.appendChild(createPhotosFragment(ad.offer.photos));

  return cardElement;
};

var createCard = function (ad) {
  var newElement = renderCard(ad);
  var referenceElement = document.querySelector('.map__filters-container');
  map.insertBefore(newElement, referenceElement);
};

createCard(ads[0]);*/

// функция блокировки полей форм
var disableFields = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'disabled');
  }
};

// функция разблокировки полей форм
var enableFields = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled', 'disabled');
  }
};

// находим формы и блокируем их поля
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
disableFields(adFormFieldsets);

var filtersForm = document.querySelector('.map__filters');
var filtersFormSelects = filtersForm.querySelectorAll('select');
enableFields(filtersFormSelects);

// заполняем адрес в неактивном состоянии
var mainPin = document.querySelector('.map__pin--main');
var address = adForm.querySelector('#address');
var mainPinX = +mainPin.style.left.split('px')[0];
var mainPinY = +mainPin.style.top.split('px')[0];
address.placeholder = Math.floor(mainPinX + mainPinParams.START_HEIGHT / 2) + ', ' + Math.floor((mainPinY + mainPinParams.START_HEIGHT / 2));

// функция вызова активго состояния страницы
var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableFields(adFormFieldsets);
  enableFields(filtersFormSelects);
  similarPins.appendChild(createFragment());
};

// отлавливаем первый клик по главному пину
mainPin.addEventListener('click', function () {
  activatePage();
});

// отлавливаем mouseup и прописываем адрес
mainPin.addEventListener('mouseup', function () {
  address.placeholder = Math.floor(mainPinX + mainPinParams.WIDTH / 2) + ', ' + Math.floor(mainPinY + mainPinParams.HEIGHT);
});

// синхронизация полей тип жилья/стоимость
var fieldType = adForm.querySelector('#type');
var fieldPrice = adForm.querySelector('#price');
var accomodationArray = Object.keys(AccomodationPrice);

var onSelectedTypeChange = function (select) {
  for (var i = 0; i < accomodationArray.length; i++) {
    switch (select) {
      case accomodationArray[i]:
        fieldPrice.min = AccomodationPrice[select];
        fieldPrice.placeholder = AccomodationPrice[select];
        break;
    }
  }
};

fieldType.addEventListener('change', function () {
  onSelectedTypeChange(fieldType.value);
});

// блок по синхронизации полей со временем заезда/выезда
var fieldTimeIn = adForm.querySelector('#timein');
var fieldTimeOut = adForm.querySelector('#timeout');

var onFieldTimeInChange = function (select) {
  for (var i = 0; i < offerParams.TIME.length; i++) {
    switch (select) {
      case offerParams.TIME[i]:
        fieldTimeOut.value = offerParams.TIME[i];
        break;
    }
  }
};

fieldTimeIn.addEventListener('change', function () {
  onFieldTimeInChange(fieldTimeIn.value);
});

var onFieldTimeOutChange = function (select) {
  for (var i = 0; i < offerParams.TIME.length; i++) {
    switch (select) {
      case offerParams.TIME[i]:
        fieldTimeIn.value = offerParams.TIME[i];
        break;
    }
  }
};

fieldTimeOut.addEventListener('change', function () {
  onFieldTimeOutChange(fieldTimeOut.value);
});

// синхронизация полей количества комнат и гостей
var fieldRooms = adForm.querySelector('#room_number');
var fieldGuests = adForm.querySelector('#capacity');
var optionsGuests = fieldGuests.querySelectorAll('option');
var checkArray = Object.keys(checkParams);

var onFieldRoomsChange = function (select) {
  for (var i = 0; i < checkArray.length; i++) {
    switch (select) {
      case checkParams[i]:
        optionsGuests.option.removeAttribute('disabled', 'disabled');
        break;
    }
  }
};

disableFields(optionsGuests);

fieldRooms.addEventListener('change', function () {
  onFieldRoomsChange(fieldRooms.value);
});
