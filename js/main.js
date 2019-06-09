'use strict';

var ADS_AMOUNT = 8;

var yCord = {
  MIN: 130,
  MAX: 630
};

var offerParams = {
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
};

var getAuthors = function () {
  var AUTHORS = [];
  for (var i = 1; i < ADS_AMOUNT + 1; i++) {
    AUTHORS[i - 1] = 'img/avatars/user0' + i + '.png';
    if (i >= 10) {
      AUTHORS[i - 1] = 'img/avatars/user' + i + '.png';
    }
  }
  return AUTHORS;
};

var AUTHORS = getAuthors();

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

// функция для получения рандомного элемента массива
var getRandomElement = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

// функция создания объявления
var getAd = function () {
  var ad = {
    author: {
      avatar: getRandomElement(AUTHORS)
    },
    offer: {
      type: getRandomElement(offerParams.TYPES)
    },
    location: {
      x: getRandomNumber(similarPinTemplate.clientWidth, searchAreaWidth - similarPinTemplate.clientWidth),
      y: getRandomNumber(yCord.MIN, yCord.MAX)
    }
  };
  return ad;
};

// функция создания массива с метками
var generateAds = function (amount) {
  var ads = [];
  for (var i = 0; i < amount; i++) {
    ads.push(getAd());
  }
  return ads;
};

var ads = generateAds(ADS_AMOUNT);

// функция вставки шаблона
var renderPin = function (ad) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - pinElement.clientWidth + 'px';
  pinElement.style.top = ad.location.y - pinElement.clientHeight + 'px';
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
