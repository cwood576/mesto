// Объявляем переменные профиля
const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const addButton = document.querySelector('.profile__add');

// Объявляем переменные попапа редактирования профиля
const popupProfile = document.querySelector('.popup_name_profile');
const popupFieldName = document.querySelector('.popup__field_type_name');
const popupFieldInfo = document.querySelector('.popup__field_type_info');
const closeProfilePopup = document.querySelector('.popup__close_name_profile');
const popupFormProfile = document.querySelector('.popup__form_name_profile');


// Объявляем переменные попапа добавления карточек
const popupPlace = document.querySelector('.popup_name_place');
const closePlacePopup = document.querySelector('.popup__close_name_place');
const popupFormPlace = document.querySelector('.popup__form_name_place');

// Объявляем переменные попапа картинок карточек
const popupImage = document.querySelector('.popup_name_image');
const closeImagePopup = document.querySelector('.popup__close_name_image');
const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');

// Объявляем блок карточек
const cardsBlock = document.querySelector('.cards');

let cardsList;

// Объявляем шаблон карточки
const cardsTemplate = document.querySelector('#card').content.querySelector('.card');

// Отключаем анимации до окончательной загрузки
window.addEventListener('load', () => {
    document.querySelector('.preload').classList.remove('preload');
});

const likeToggle = (evt) => {
    evt.target.classList.toggle('card__like_active')
}

const cardDelete = (evt) => {
    evt.target.parentNode.remove()
}

const openPopupImage = (evt) => {
    popupImg.src = evt.target.style.backgroundImage.slice(5, -2);
    popupImg.alt = evt.target.parentNode.querySelector('.card__name').textContent;
    popupCaption.textContent = evt.target.parentNode.querySelector('.card__name').textContent;
    openPopup(popupImage);

}

const createCards = (arr) => {
    cardsList = []
    array = arr.reverse()
    array.forEach(x => {
        let card;
        card = cardsTemplate.cloneNode(true)
        card.querySelector('.card__like').addEventListener('click', likeToggle)
        card.querySelector('.card__image').addEventListener('click', openPopupImage)
        card.querySelector('.card__trash').addEventListener('click', cardDelete)
        card.querySelector('.card__image').style.backgroundImage = `url(${x.link})`;
        card.querySelector('.card__image').alt = x.name;

        card.querySelector('.card__name').textContent = x.name;

        cardsList.push(card);
    })
    return cardsList
}

const renderCards = (cardsArr) => {
    cardsArr.forEach(x => {
        cardsBlock.prepend(x)
    })
}
createCards(initialCards);
renderCards(cardsList);

const createNewCards = (evt) => {
    evt.preventDefault();
    let cardArr = [{
        name: `${evt.target.querySelector('.popup__field_type_name ').value}`,
        link: `${evt.target.querySelector('.popup__field_type_info ').value}`
    }];
    createCards(cardArr);
    renderCards(cardsList);
    closePopup(popupPlace);
    evt.target.reset();
}

const openPopup = (popupName) => {
    popupName.classList.add('popup_opened');
    document.addEventListener("keyup", (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popupName)
        }
    });
}

const closePopup = (popupName) => {
    popupName.classList.remove('popup_opened');
    if (popupName === popupProfile) {
        cleanErrorMessage(popupName);
    }
}

const saveProfile = (evt) => {
    evt.preventDefault();
    profileName.innerText = popupFieldName.value;
    profileStatus.innerText = popupFieldInfo.value;
    closePopup(popupProfile);
}


popupProfile.addEventListener('click', (evt) => {
    if (evt.target === popupProfile || evt.target === closeProfilePopup) {
        closePopup(popupProfile)
    }
});
popupPlace.addEventListener('click', (evt) => {
    if (evt.target === popupPlace || evt.target === closePlacePopup) {
        closePopup(popupPlace)
    }
});
popupImage.addEventListener('click', (evt) => {
    if (evt.target === popupImage || evt.target === closeImagePopup) {
        closePopup(popupImage)
    }
});


editButton.addEventListener("click", () => {
    popupFieldName.value = profileName.textContent;
    popupFieldInfo.value = profileStatus.textContent;
    openPopup(popupProfile);
});
addButton.addEventListener('click', () => {
    openPopup(popupPlace);
})
popupFormProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

});
popupFormPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
});