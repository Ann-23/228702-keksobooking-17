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

var offerParams = {
  TITLE: ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'],
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
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

var time = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// максимальное значение координаты X поля, где будут располагаться все метки
var searchAreaWidth = document.querySelector('.map').clientWidth;

// находим карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
  var featuresAmount = [];
  var amount = getRandomNumber(1, FEATURES.length);
  for (var i = 0; i < amount; i++) {
    featuresAmount.push(FEATURES[i]);
  }
  return featuresAmount;
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var getSortPhotos = function () {
  PHOTOS.sort(compareRandom);
  return PHOTOS;
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
      type: offerParams.TYPES[getRandomNumber(0, offerParams.TYPES.length)],
      rooms: getRandomNumber(rooms.MIN, rooms.MAX),
      guests: getRandomNumber(guests.MIN, guests.MAX),
      checkin: time[getRandomNumber(0, time.length)],
      chekout: time[getRandomNumber(0, time.length)],
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

// функция создания фрагмента
var createFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  return fragment;
};

similarPins.appendChild(createFragment());

// функция вставки шаблона объявления
var renderCard = function () {
  for (var i = 1; i <= ADS_AMOUNT; i++) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = getAd(i).author.avatar;
    var cardTitle = cardElement.querySelector('.popup__title');
    cardTitle.textContent = getAd(i).offer.title;
    var cardAddress = cardElement.querySelector('.popup__text--address');
    cardAddress.textContent = getAd(i).offer.address;
    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.textContent = getAd(i).offer.price + ' ₽/ночь';
    var cardType = cardElement.querySelector('.popup__type');
    cardType.textContent = getAd(i).offer.type;
    var cardGuest = cardElement.querySelector('.popup__text--capacity');
    cardGuest.textContent = getAd(i).offer.rooms + ' комнаты для ' + getAd(i).offer.guests + ' гостей';
    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime .textContent = 'Заезд после ' + getAd(i).offer.checkin + ', выезд до ' + getAd(i).offer.checkout;
    var cardDescription = cardElement.querySelector('.popup__description');
    cardDescription.textContent = getAd(i).offer.description;
  }

  return cardElement;
};

var createCard = function () {
  var newElement = renderCard();
  var referenceElement = document.querySelector('.map__filters-container');
  map.insertBefore(newElement, referenceElement); // map вверху (стр.55) объявлена временно, для открытия карты

  return newElement;
};

createCard();
