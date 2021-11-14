import { Card } from "./Card";

export class Gallery {
  _gallery = document.createElement("div");
  _galleryList = document.createElement("div");
  _cards = [];
  constructor(title = "") {
    if (title !== "") {
      this._title = document.createElement("h2");
      this._title.classList.add("gallery__title");
      this._title.textContent = title;
    }
    this._gallery.classList.add("gallery");
    this._galleryList.classList.add("gallery__list");

    this._gallery.insertAdjacentElement("afterbegin", this._galleryList);
    this._gallery.insertAdjacentElement("afterbegin", this._title);
  }
  render() {
    this._cards.forEach((card) =>
      this._galleryList.insertAdjacentElement("beforeend", card.getElement())
    );
  }
  addItems(...items) {
    items.forEach((item) => {
      this._cards.push(new Card(item));
    });
    this.render();
  }
  getElement() {
    return this._gallery;
  }
}
