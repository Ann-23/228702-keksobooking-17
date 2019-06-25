'use strict';

(function () {

  // находим шаблон меток в template
  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var PinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  // функция вставки шаблона метки
  var renderPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - PinParams.WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - PinParams.HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    return pinElement;
  };

  // функция создания фрагмента для меток
  window.getPinElements = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }
    return fragment;
  };
})();
