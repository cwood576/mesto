// Подключаем модули
import { Card } from './Card.js';
import { configValidation } from './configValidation.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

// Объявляем переменные профиля
const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const addButton = document.querySelector('.profile__add');

// Объявляем переменные попапа редактирования профиля
const popupProfile = document.querySelector('.popup_name_profile');
const popupFieldName = document.querySelector('.popup__field_type_name');
const popupFieldInfo = document.querySelector('.popup__field_type_info');
const popupProfileCloseButton = document.querySelector('.popup__close_name_profile');
const popupFormProfile = document.querySelector('.popup__form_name_profile');


// Объявляем переменные попапа добавления карточек
const popupPlace = document.querySelector('.popup_name_place');
const popupPlaceCloseButton = document.querySelector('.popup__close_name_place');
const popupFormPlace = document.querySelector('.popup__form_name_place');

// Объявляем переменные попапа картинок карточек
const popupImage = document.querySelector('.popup_name_image');
const popupImageCloseButton = document.querySelector('.popup__close_name_image');
const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');



// Отключаем анимации до окончательной загрузки
window.addEventListener('load', () => {
    document.querySelector('.preload').classList.remove('preload');
});

const submitActive = (form) => {
    if (form.classList.contains(configValidation.formNameList.place)) {
        form.querySelector('.popup__button').removeAttribute("disabled");
        form.addEventListener('submit', createNewCards);

    } else if (form.classList.contains(configValidation.formNameList.profile)) {
        form.addEventListener('submit', saveProfile);

    }
}
const submitDisable = (form) => {
    if (form.classList.contains(configValidation.formNameList.place)) {
        form.removeEventListener('submit', createNewCards);
        form.querySelector('.popup__button').setAttribute("disabled", '');

    } else if (form.classList.contains(configValidation.formNameList.profile)) {
        form.removeEventListener('submit', saveProfile);
    }
}


const openPopupImage = (evt) => {
    popupImg.src = evt.target.style.backgroundImage.slice(5, -2);
    popupImg.alt = evt.target.parentNode.querySelector('.card__name').textContent;
    popupCaption.textContent = evt.target.parentNode.querySelector('.card__name').textContent;
    openPopup(popupImage);
}


initialCards.forEach(x => {
    let a = new Card(x, openPopupImage);
    a.renderCards();
})

Array.from(document.querySelectorAll(`${ configValidation.formSelector }`)).forEach(form => {
    let formElement = new FormValidator(configValidation, form, submitActive, submitDisable)
    formElement.enableValidation();
});

const createNewCards = (evt) => {
    evt.preventDefault();
    const newCardObj = {
        name: `${evt.target.querySelector('.popup__field_type_name ').value}`,
        link: `${evt.target.querySelector('.popup__field_type_info ').value}`
    };
    let newCard = new Card(newCardObj, openPopupImage);
    newCard.renderCards();
    closePopup(popupPlace);
    evt.target.reset();
    const button = evt.target.querySelector('.popup__button');
    button.classList.remove('popup__button_active');
    button.setAttribute("disabled", "");
}

const cleanErrorMessage = (popupName) => {
    const popupError = popupName.querySelectorAll('.popup__error');
    popupError.forEach(errorMessage => {
        errorMessage.textContent = ''
    })

}
const openPopup = (popupName) => {
    popupName.classList.add('popup_opened');
    document.addEventListener("keyup", escButtonClose);
}

const closePopup = (popupName) => {
    popupName.classList.remove('popup_opened');
    document.removeEventListener('keyup', escButtonClose)
}

const saveProfile = (evt) => {
    evt.preventDefault();
    profileName.innerText = popupFieldName.value;
    profileStatus.innerText = popupFieldInfo.value;
    closePopup(popupProfile);
}


popupProfile.addEventListener('mousedown', (evt) => {
    if (evt.target === popupProfile || evt.target === popupProfileCloseButton) {
        closePopup(popupProfile)
    }
});
popupPlace.addEventListener('mousedown', (evt) => {
    if (evt.target === popupPlace || evt.target === popupPlaceCloseButton) {
        closePopup(popupPlace)
    }
});
popupImage.addEventListener('mousedown', (evt) => {
    if (evt.target === popupImage || evt.target === popupImageCloseButton) {
        closePopup(popupImage)
    }
});

const escButtonClose = (evt) => {
    if (evt.key === 'Escape') {
        const popupName = document.querySelector('.popup_opened')
        closePopup(popupName);
    }
}

editButton.addEventListener("click", () => {
    popupFieldName.value = profileName.textContent;
    popupFieldInfo.value = profileStatus.textContent;
    cleanErrorMessage(popupProfile);
    openPopup(popupProfile);
});
addButton.addEventListener('click', () => {
    openPopup(popupPlace);
});

popupFormProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

});
popupFormPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
});