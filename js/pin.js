'use strict';

(function () {

  var ADS_AMOUNT = 8;

  // находим шаблон меток в template
  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var similarErrorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error__message');

  var mainArea = document.querySelector('main');

  var pinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  // функция вставки шаблона метки
  var renderPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - pinParams.WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - pinParams.HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    return pinElement;
  };

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADS_AMOUNT; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }
    return fragment;
  };

  var errorHandler = function () {
    var errorMessage = similarErrorTemplate.cloneNode(true);
    mainArea.appendChild(errorMessage);
  };

  window.load(successHandler, errorHandler);
})();
