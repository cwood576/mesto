export class FormValidator {
    constructor(configValidation, form, submitActiveFunc, submitDisableFunc) {
        this.config = configValidation;
        this.form = form;
        this.submitActiveFunc = submitActiveFunc;
        this.submitDisableFunc = submitDisableFunc;
    }

    changeButtonState = (formFields) => {
        if (formFields.every(field => field.validity.valid)) {
            this.form.querySelector(`${ this.config.submitButtonSelector } `).classList.add(`${ this.config.activeButtonClass }`);
            this.submitActiveFunc(this.form)
        } else {
            this.form.querySelector(`${this.config.submitButtonSelector }`).classList.remove(`${ this.config.activeButtonClass }`)
            this.submitDisableFunc(this.form)

        }
    }

    changeErrorMessage = (evt) => {
        evt.target.parentNode.querySelector(`.${ this.config.inputErrorClass }_${ evt.target.name }`).textContent = evt.target.validationMessage;
    }

    enableValidation = () => {
        const formFields = Array.from(this.form.querySelectorAll(`${ this.config.inputSelector }`));
        this.form.addEventListener('input', (evt) => {
            this.changeButtonState(formFields);
            this.changeErrorMessage(evt);
        })
    }
}