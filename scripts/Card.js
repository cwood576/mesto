export class Card {
    constructor(card, openPopupFunc) {
        this._name = card.name;
        this._link = card.link;
        this._openPopupFunc = openPopupFunc;
    }

    // Объявляем блок карточек
    cardsBlock = document.querySelector('.cards');

    // Объявляем метод получения шаблона карточки
    _getTemplate() {
        return document.querySelector('#card').content.querySelector('.card').cloneNode(true);
    }

    // Объявляем метод создания карточки
    _createCard() {
        let card = this._getTemplate();
        card.querySelector('.card__like').addEventListener('click', this._likeToggle)
        card.querySelector('.card__image').addEventListener('click', this._openPopupFunc)
        card.querySelector('.card__trash').addEventListener('click', this._deleteCard)
        card.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
        card.querySelector('.card__image').alt = this._name;
        card.querySelector('.card__name').textContent = this._name;
        return card
    }

    // Объявляем метод добавления карточки
    renderCards() {
        let card = this._createCard();
        this.cardsBlock.prepend(card)
    }

    //Объявляем метод удаления карточки
    _deleteCard(evt) {
        evt.target.parentNode.remove();
    }

    //Объявляем метод проставления лайка на карточку
    _likeToggle(evt) {
        evt.target.classList.toggle('card__like_active');
    }
}