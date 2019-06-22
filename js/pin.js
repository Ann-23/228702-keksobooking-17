'use strict';

(function () {

  var ADS_AMOUNT = 8;

  // находим шаблон меток в template
  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

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

  var ads = window.generateAds(ADS_AMOUNT);

  // функция создания фрагмента для меток
  window.createFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }
    return fragment;
  };
})();
