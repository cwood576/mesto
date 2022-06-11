let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status')
let popupName = document.querySelector('.popup__field_type_name')
let popupStatus = document.querySelector('.popup__field_type_status')
let editButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup__form');

function openPopup() {
    popupName.value = profileName.innerText;
    popupStatus.value = profileStatus.innerText;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function saveProfile(evt) {
    evt.preventDefault();
    profileName.innerText = popupName.value;
    profileStatus.innerText = popupStatus.value;
    closePopup();
}

popupForm.addEventListener('submit', saveProfile);
editButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);