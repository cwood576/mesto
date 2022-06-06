let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let status = document.querySelector('.profile__status')
let popupName = document.querySelector('.popup__name')
let popupStatus = document.querySelector('.popup__status')
let editButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let sendFormButton = document.querySelector('.popup__button');

popupName.value = name.innerText;
popupStatus.value = status.innerText;


function openPopup() {
    popup.classList.add('popup_opened');
    document.addEventListener("keypress", function(e) {
        if (e.key === 'Enter') {
            saveProfile()
        }
    });
}

function closePopup() {
    popup.classList.remove('popup_opened');
    popupName.value = name.innerText;
    popupStatus.value = status.innerText;
}

function saveProfile() {
    name.innerText = popupName.value;
    status.innerText = popupStatus.value;
    closePopup();
}


sendFormButton.addEventListener("click", saveProfile);
editButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);