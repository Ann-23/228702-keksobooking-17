'use strict';

(function () {

  var PinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var ADS_LIMIT = 5;

  var similarPins = document.querySelector('.map__pins');

  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var pins = [];

  // функция вставки шаблона метки
  var renderPin = function (ad) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - PinParams.WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - PinParams.HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.remove();
      deactivatePin();
      pinElement.classList.add('map__pin--active');
      window.map.show(ad);
    });

    return pinElement;
  };

  // функция создания фрагмента для меток
  var getPinElements = function (ads) {
    var fragment = document.createDocumentFragment();
    var amount = ads.length < ADS_LIMIT ? ads.length : ADS_LIMIT;
    for (var i = 0; i < amount; i++) {
      if ('offer' in ads[i]) {
        var pin = renderPin(ads[i]);
        pins.push(pin);
        fragment.appendChild(pin);
      }
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

  var showPins = function (ads) {
    removePinElements();
    similarPins.appendChild(getPinElements(ads));
  };

  // функция снятия класса активного пина
  var deactivatePin = function () {
    var pinActive = document.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  window.pins = {
    show: showPins,
    remove: removePinElements,
    deactivate: deactivatePin
  };
})();
