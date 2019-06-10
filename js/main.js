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

var getAvatarImg = function (index) {
  var avatarIndex = index;
  if (index < 10) {
    avatarIndex = '0' + index;
  }
  return 'img/avatars/user' + avatarIndex + '.png';
};

// максимальное значение координаты X поля, где будут располагаться все метки
var searchAreaWidth = document.querySelector('.map__pins').clientWidth;

// находим карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// находим шаблон меток в template
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var similarPins = document.querySelector('.map__pins');

// функция для получения рандомного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// функция создания объявления
var getAd = function (index) {
  var ad = {
    author: {
      avatar: getAvatarImg(index)
    },
    offer: {
      type: offerParams.TYPES[getRandomNumber(0, offerParams.TYPES.length)]
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

// функция вставки шаблона
var renderPin = function (ad) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - pinParams.WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.author.offer;

  return pinElement;
};

// функция создания фрагмента
var creatFragment = function (amount) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < amount.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  return fragment;
};

similarPins.appendChild(creatFragment(ads));
