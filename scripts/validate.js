const popupForms = Array.from(document.querySelectorAll('.popup__form'));

const configValidation = {
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

const changeButtonState = (form, formFields, config) => {
    if (formFields.every(field => field.validity.valid)) {
        form.querySelector(`${ config.submitButtonSelector } `).classList.add(`${ config.activeButtonClass }`);
        submitActive(form)
    } else {
        form.querySelector(`${ config.submitButtonSelector }`).classList.remove(`${ config.activeButtonClass }`)
        submitDisable(form)

    }
}

const changeErrorMessage = (evt, config) => {
    evt.target.parentNode.querySelector(`.${ config.inputErrorClass }_${ evt.target.name }`).textContent = evt.target.validationMessage;
}

const cleanErrorMessage = (popupName) => {
    const popupError = popupName.querySelectorAll('.popup__error');
    popupError.forEach(errorMessage => {
        errorMessage.textContent = ''
    })

}


const validateForm = (form, config) => {
    const formFields = Array.from(form.querySelectorAll(`${ config.inputSelector }`));
    form.addEventListener('input', (evt) => {
        changeButtonState(form, formFields, config);
        changeErrorMessage(evt, config);
    })
}

const validateAllForms = (config) => {
    Array.from(document.querySelectorAll(`${ config.formSelector }`)).forEach(form => {
        validateForm(form, config)
    });
}

validateAllForms(configValidation);