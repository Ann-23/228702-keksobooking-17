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

  // функция показа карточек
  var pinListener = function (element, ad) {
    element.addEventListener('click', function () {
      var card = document.querySelector('article');
      if (card) {
        card.remove();
      }
      var pinActive = document.querySelector('.map__pin--active');
      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }
      element.classList.add('map__pin--active');
      window.map.showCard(ad);
    });
  };

  // функция вставки шаблона метки
  var renderPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - PinParams.WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - PinParams.HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    pinListener(pinElement, ad);

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
