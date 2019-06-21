'use strict';

(function () {

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
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  // функция для получения рандомного числа
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var getSortPhotos = function () {
    offerParams.PHOTOS.sort(compareRandom);
    return offerParams.PHOTOS;
  };

  var getAccommodationType = function () {
    var typeObject = Object.keys(window.AccommodationType);
    var typeNumber = getRandomNumber(0, typeObject.length - 1);

    return typeObject[typeNumber];
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

  // функция создания объявления
  var getAd = function (index) {
    var ad = {
      author: {
        avatar: getAvatarImg(index)
      },
      offer: {
        title: offerParams.TITLE[index - 1],
        address: [getRandomNumber(window.pinParams.WIDTH / 2, window.searchAreaWidth - window.pinParams.WIDTH / 2), getRandomNumber(window.yCord.MIN, window.yCord.MAX)],
        price: getRandomNumber(price.MIN, price.MAX),
        rooms: getRandomNumber(rooms.MIN, rooms.MAX),
        guests: getRandomNumber(guests.MIN, guests.MAX),
        checkin: offerParams.TIME[getRandomNumber(0, offerParams.TIME.length)],
        checkout: offerParams.TIME[getRandomNumber(0, offerParams.TIME.length)],
        type: getAccommodationType(),
        features: getRandomFeatures(),
        description: '',
        photos: getSortPhotos()
      },
      location: {
        x: getRandomNumber(window.pinParams.WIDTH / 2, window.searchAreaWidth - window.pinParams.WIDTH / 2),
        y: getRandomNumber(window.yCord.MIN, window.yCord.MAX)
      }
    };
    return ad;
  };
  // функция создания массива с метками
  window.generateAds = function (amount) {
    var ads = [];
    for (var i = 0; i < amount; i++) {
      ads.push(getAd(i + 1));
    }
    return ads;
  };
})();
