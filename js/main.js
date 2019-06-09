'use strict';

var announcementParams = {
  AUTHORS: [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ],
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  PINS_QUANTITY: 8
};

var quantityOfPins = announcementParams.PINS_QUANTITY;

// максимальное значение координаты Y поля, где будут располагаться все метки
var searchAreaHeight = document.querySelector('.map__pins').clientHeight;

// максимальное значение координаты X поля, где будут располагаться все метки
var searchAreaWidth = document.querySelector('.map__pins').clientWidth;

// находим карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var similarPins = document.querySelector('.map__pins');

// функция для получения рандомных координат с карты
var getRandomCoordinate = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// функция для получения рандомного индекса массива
var getRandomElement = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

// функция создания метки объявления
var getPin = function () {
  var pin = {
    author: {
      avatar: getRandomElement(announcementParams.AUTHORS)
    },
    offer: {
      type: getRandomElement(announcementParams.TYPES)
    },
    location: {
      x: getRandomCoordinate(0, searchAreaWidth),
      y: getRandomCoordinate(0, searchAreaHeight)
    }
  };
  return pin;
};

// функция создания массива с метками
var generatePins = function () {
  var pins = [];
  for (var i = 0; i < quantityOfPins; i++) {
    pins.push(getPin());
  }
  return pins;
};

var pins = generatePins(quantityOfPins);

// функция вставки шаблона
var renderPin = function () {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = location.x - pinElement.clientWidth + 'px';
  pinElement.style.top = location.y - pinElement.clientHeight + 'px';
  pinElement.querySelector('img').src = getPin().author.avatar;
  pinElement.querySelector('img').alt = getPin().author.offer;

  return pinElement;
};

// функция создания фрагмента
var creatFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  return fragment;
};

similarPins.appendChild(creatFragment());
