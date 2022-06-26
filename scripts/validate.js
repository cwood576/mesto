const popupForms = Array.from(document.querySelectorAll('.popup__form'));

const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    activeButtonClass: 'popup__button_active',
    inputErrorClass: 'popup__error_name',
    formNameList: {
        profile: 'popup__form_name_profile',
        place: 'popup__form_name_place'
    }
}

const submitActive = (form) => {
    if (form.classList.contains(enableValidation.formNameList.place)) {
        form.addEventListener('submit', createNewCards);
        console.log(123)

    } else if (form.classList.contains(enableValidation.formNameList.profile)) {
        form.addEventListener('submit', saveProfile);
        console.log(333)

    }
}
const submitDisable = (form) => {
    if (form.classList.contains(enableValidation.formNameList.place)) {
        form.removeEventListener('submit', createNewCards);
    } else if (form.classList.contains(enableValidation.formNameList.profile)) {
        form.removeEventListener('submit', saveProfile);
    }
}



const changeButtonState = (form, formFields) => {
    if (formFields.every(field => field.validity.valid)) {
        form.querySelector(`${ enableValidation.submitButtonSelector } `).classList.add(`${ enableValidation.activeButtonClass }`);
        submitActive(form)
    } else {
        form.querySelector(`${ enableValidation.submitButtonSelector }`).classList.remove(`${ enableValidation.activeButtonClass }`)
        submitDisable(form)

    }
}

const changeErrorMessage = (evt) => {
    evt.target.parentNode.querySelector(`.${ enableValidation.inputErrorClass }_${ evt.target.name }`).textContent = evt.target.validationMessage;
}

const cleanErrorMessage = (popupName) => {
    const popupError = popupName.querySelectorAll('.popup__error');
    popupError.forEach(errorMessage => {
        errorMessage.textContent = ''
    })

}


const validateForm = (form) => {
    const formFields = Array.from(form.querySelectorAll(`${ enableValidation.inputSelector }`));
    form.addEventListener('input', (evt) => {
        changeButtonState(form, formFields);
        changeErrorMessage(evt);
    })
}

const validateAllForms = () => {
    Array.from(document.querySelectorAll(`${ enableValidation.formSelector }`)).forEach(form => {
        validateForm(form)
    });
}

validateAllForms(enableValidation);