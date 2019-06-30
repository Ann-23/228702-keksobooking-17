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

  var pins = [];
  var ADS_LIMITER = 5;

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
  var getPinElements = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADS_LIMITER; i++) {
      var pin = renderPin(ads[i]);
      pins.push(pin);
      fragment.appendChild(pin);
    }
    return fragment;
  };

  // функция удаления пинов
  var removePinElements = function () {
    pins.forEach(function (pin) {
      pin.remove();
    });
    pins = [];
  };

  // функция снятия класса активного пина
  var deactivatePin = function () {
    var pinActive = document.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  // функция переключения карточек
  var pinListener = function (element, ad) {
    element.addEventListener('click', function () {
      window.card.remove();
      deactivatePin();
      element.classList.add('map__pin--active');
      window.map.showCard(ad);
    });
  };

  window.pin = {
    getElements: getPinElements,
    removeElements: removePinElements,
    deactivate: deactivatePin
  };
})();
