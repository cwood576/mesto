// Объявляем переменные профиля
let editButton = document.querySelector('.profile__edit');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let addButton = document.querySelector('.profile__add');

// Объявляем переменные попапа редактирования профиля
let popupProfile = document.querySelector('.popup__profile');
let popupName = document.querySelector('.popup__field_type_name');
let popupInfo = document.querySelector('.popup__field_type_info');
let closeProfilePopup = document.querySelector('.popup__close_name_profile');
let popupFormProfile = document.querySelector('.popup__form_name_profile');

// Объявляем переменные попапа добавления карточек
let popupPlace = document.querySelector('.popup__place');
let closePlacePopup = document.querySelector('.popup__close_name_place');
let popupFormPlace = document.querySelector('.popup__form_name_place');

// Объявляем переменные попапа картинок карточек
let popupImage = document.querySelector('.popup__image');
let closeImagePopup = document.querySelector('.popup__close_name_image');
let popupImg = document.querySelector('.popup__img');
let popupCaption = document.querySelector('.popup__caption');

// Объявляем блок карточек
let cardsBlock = document.querySelector('.cards');

// Объявляем шаблон карточки
const cardsTemplate = document.querySelector('#card').content.querySelector('.card');

// Отключаем анимации до окончательной загрузки
window.addEventListener('load', () => {
    document.querySelector('.preload').classList.remove('preload');
});


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const like = (evt) => {
    evt.target.classList.toggle('card__like_active')
}

const cardDelete = (evt) => {
    evt.target.parentNode.remove()
}

const openPopupImage = (evt) => {
    popupImg.src = evt.target.style.backgroundImage.slice(5, -2);
    popupCaption.textContent = evt.target.parentNode.querySelector('.card__name').textContent;
    openPopup(popupImage);

}

const createCards = (arr) => {
    let array = arr.reverse();
    array.forEach(x => {
        let card;
        card = cardsTemplate.cloneNode(true)
        card.querySelector('.card__like').addEventListener('click', like)
        card.querySelector('.card__image').style.backgroundImage = `url(${x.link})`;
        card.querySelector('.card__name').textContent = x.name;

        cardsBlock.prepend(card);
    })

    cardsBlock.querySelectorAll('.card').forEach(x => {
        x.querySelector('.card__image').addEventListener('click', openPopupImage)
        x.querySelector('.card__like').addEventListener('click', like);
        x.querySelector('.card__trash').addEventListener('click', cardDelete)
    })

}

createCards(initialCards);

const createNewCards = (evt) => {
    evt.preventDefault();
    let cardArr = [{
        name: `${evt.target.querySelector('.popup__field_type_name ').value}`,
        link: `${evt.target.querySelector('.popup__field_type_info ').value}`
    }];
    createCards(cardArr)
    closePopupPlace()
}

const openPopup = (popupName) => {
    popupName.classList.add('popup_opened');
}

const closePopup = (popupName) => {
    popupName.classList.remove('popup_opened');
}

const saveProfile = (evt) => {
    evt.preventDefault();
    profileName.innerText = popupName.value;
    profileStatus.innerText = popupInfo.value;
    closePopup(popupProfile);
}


popupFormProfile.addEventListener('submit', saveProfile);
popupFormPlace.addEventListener('submit', createNewCards);
editButton.addEventListener("click", () => {
    popupName.value = profileName.textContent;
    popupInfo.value = profileStatus.textContent;
    openPopup(popupProfile);
});
closePlacePopup.addEventListener("click", () => {
    closePopup(popupPlace);
});
closeProfilePopup.addEventListener("click", () => {
    closePopup(popupProfile);
});
closeImagePopup.addEventListener('click', () => {
    closePopup(popupImage);
})
addButton.addEventListener('click', () => {
    openPopup(popupPlace);
})