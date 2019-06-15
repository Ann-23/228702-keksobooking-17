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
  HEIGHT: 87
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
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
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
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

// функция создания фрагмента фич для объявления
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

// similarPins.appendChild(createFragment());

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
  map.insertBefore(newElement, referenceElement); // map вверху (стр.55) объявлена временно, для открытия карты
};

// createCard(ads[0]);

// функция блокировки полей форм
var setDisabled = function (item) {
  for (var i = 0; i < item.length; i++) {
    item[i].setAttribute('disabled', 'disabled');
  }
};

// функция разблокировки полей форм
var unsetDisabled = function (item) {
  for (var i = 0; i < item.length; i++) {
    item[i].removeAttribute('disabled', 'disabled');
  }
};

// находим формы и блокируем их поля
var adForm = document.querySelector('.ad-form');
var adFormItem = adForm.querySelectorAll('fieldset');
setDisabled(adFormItem);

var filtersForm = document.querySelector('.map__filters');
var filtersFormItem = filtersForm.querySelectorAll('select');
setDisabled(filtersFormItem);

// заполняем адрес в неактивном состоянии
var address = adForm.querySelector('#address');
address.placeholder = mainPinParams.WIDTH / 2 + ', ' + mainPinParams.HEIGHT / 2;

// функция вызова активного состояния страницы
var getActiveState = function () {
  map.classList.remove('map--faded');
  similarPins.appendChild(createFragment());
  createCard(ads[0]);
  adForm.classList.remove('ad-form--disabled');
  unsetDisabled(adFormItem);
  unsetDisabled(filtersFormItem);
  address.placeholder = mainPinParams.WIDTH / 2 + ', ' + mainPinParams.HEIGHT;
};

// отлавливаем первый клик по главному пину
var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('click', function () {
  getActiveState();
});

// отлавливаем mouseup и прописываем адрес
mainPin.addEventListener('mouseup', function () {
  getActiveState();
});
