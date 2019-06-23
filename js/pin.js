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

  // функция создания фрагмента для меток

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADS_AMOUNT; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }
    return fragment;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
})();
