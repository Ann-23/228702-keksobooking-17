'use strict';

(function () {

  var AccommodationType = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  // находим шаблон карточки объявления в template
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // функция создания фрагмента фич для объявления
  var createFeaturesFragment = function (features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      var dopClass = 'popup__feature--' + features[i];
      featureElement.classList.add(dopClass);
      fragment.appendChild(featureElement);
    }
    return fragment;
  };

  // функция создания фрагмента фото для объявления
  var createPhotosFragment = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.src = photos[i];
      photoElement.width = '45';
      photoElement.height = '40';
      photoElement.alt = 'Фотография жилья';
      fragment.appendChild(photoElement);
    }
    return fragment;
  };

  // функция вставки шаблона объявления
  var renderCard = function (ad) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    var cardTitle = cardElement.querySelector('.popup__title');
    cardTitle.textContent = ad.offer.title;

    var cardAddress = cardElement.querySelector('.popup__text--address');
    cardAddress.textContent = ad.offer.address;

    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.textContent = ad.offer.price + ' ₽/ночь';

    var cardType = cardElement.querySelector('.popup__type');
    cardType.textContent = AccommodationType[ad.offer.type];

    var cardGuest = cardElement.querySelector('.popup__text--capacity');
    cardGuest.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var cardFeatures = cardElement.querySelector('.popup__features');
    cardFeatures.appendChild(createFeaturesFragment(ad.offer.features));

    var cardDescription = cardElement.querySelector('.popup__description');
    cardDescription.textContent = ad.offer.description;

    var cardPhotos = cardElement.querySelector('.popup__photos');
    cardPhotos.appendChild(createPhotosFragment(ad.offer.photos));

    var buttonClose = cardElement.querySelector('button');
    buttonClose.addEventListener('click', function () {
      onCloseButtonClick();
    });

    return cardElement;
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var onCloseButtonClick = function () {
    removeCard();
    window.pin.deactivate();
  };

  window.card = {
    render: renderCard,
    remove: onCloseButtonClick,
  };
})();
