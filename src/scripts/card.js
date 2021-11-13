export class Card {
  _card = document.createElement("figure");
  _cardContent = document.createElement("div");
  _cardDescription = document.createElement("figcaption");
  constructor({ element, description = "" }) {
    this._card.classList.add("card");
    this._cardContent.classList.add("card__content");
    this._cardDescription.classList.add("card__description");
    element.classList.add("card__content-item");

    this._cardDescription.textContent = description;
    this._cardContent.insertAdjacentElement("afterbegin", element);

    this._card.insertAdjacentElement("afterbegin", this._cardDescription);
    this._card.insertAdjacentElement("afterbegin", this._cardContent);
  }
  getElement() {
    return this._card;
  }
}
