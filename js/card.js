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
    features.forEach(function (it) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      var featureClass = 'popup__feature--' + it;
      featureElement.classList.add(featureClass);
      fragment.appendChild(featureElement);
    });
    return fragment;
  };

  // функция создания фрагмента фото для объявления
  var createPhotosFragment = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (it) {
      var photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.src = it;
      photoElement.width = '45';
      photoElement.height = '40';
      photoElement.alt = 'Фотография жилья';
      fragment.appendChild(photoElement);
    });
    return fragment;
  };

  var checkEmptyValue = function (dataType, element) {
    if (dataType.length === 0) {
      element.classList.add('visually-hidden');
    }
  };

  // функция вставки шаблона объявления
  var renderCard = function (ad) {
    var cardElement = similarCardTemplate.cloneNode(true);

    var cardAvatar = cardElement.querySelector('.popup__avatar');
    cardAvatar.src = ad.author.avatar;
    checkEmptyValue(ad.author.avatar, cardAvatar);

    var cardTitle = cardElement.querySelector('.popup__title');
    cardTitle.textContent = ad.offer.title;
    checkEmptyValue(ad.offer.title, cardTitle);

    var cardAddress = cardElement.querySelector('.popup__text--address');
    cardAddress.textContent = ad.offer.address;
    checkEmptyValue(ad.offer.address, cardAddress);

    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.textContent = ad.offer.price + ' ₽/ночь';
    checkEmptyValue(ad.offer.price, cardPrice);

    var cardType = cardElement.querySelector('.popup__type');
    cardType.textContent = AccommodationType[ad.offer.type.toUpperCase()];
    checkEmptyValue(ad.offer.type, cardType);

    var cardGuest = cardElement.querySelector('.popup__text--capacity');
    cardGuest.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    checkEmptyValue(ad.offer.rooms, cardGuest);

    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    checkEmptyValue(ad.offer.checkin, cardTime);

    var cardFeatures = cardElement.querySelector('.popup__features');
    cardFeatures.appendChild(createFeaturesFragment(ad.offer.features));
    checkEmptyValue(ad.offer.features, cardFeatures);

    var cardDescription = cardElement.querySelector('.popup__description');
    cardDescription.textContent = ad.offer.description;
    checkEmptyValue(ad.offer.description, cardDescription);

    var cardPhotos = cardElement.querySelector('.popup__photos');
    cardPhotos.appendChild(createPhotosFragment(ad.offer.photos));
    checkEmptyValue(ad.offer.photos, cardPhotos);

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
    window.pins.deactivate();
  };

  window.card = {
    render: renderCard,
    remove: onCloseButtonClick
  };
})();
