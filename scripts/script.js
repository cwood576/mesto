let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let status = document.querySelector('.profile__status')
let popupName = document.querySelector('.popup__name')
let popupStatus = document.querySelector('.popup__status')
let editButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup__form');

function openPopup() {
    popupName.value = name.innerText;
    popupStatus.value = status.innerText;
    popup.classList.add('popup_opened');
    // Добавляем возможность сохранить данные профиля в соотвествии с чеклистом
    document.addEventListener("keypress", function(e) {
        if (e.key === 'Enter') {
            saveProfile()
        }
    });
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function saveProfile(evt) {
    evt.preventDefault();
    name.innerText = popupName.value;
    status.innerText = popupStatus.value;
    closePopup();
}

popupForm.addEventListener('submit', saveProfile);
editButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);