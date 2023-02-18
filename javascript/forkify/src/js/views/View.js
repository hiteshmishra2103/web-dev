//this file contains the class fields and methods which are common in all the views which will help
//us to follow the DRY(Do Not Repeat Yourself) and we will achieve that by inheritance⭐⭐⭐

//In short the View class is the parent class of all other classes related to views such recipeView,
//resultsView and the fields and methods which are different in other files they will not be included
//in this class

import icons from "url:../../img/icons.svg"; //parcel v2

export default class View {
  //data field will store the data of recipes fetched
  _data;

  render(data) {
    //It will throw the error when the data is not fetched or if the data is fetched but the data array
    //is empty, because in case of inappropriate search query the data is also fetched but the array is
    //empty
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();

    //Clearing the content from recipe container
    this._clear();

    //Inserting the html markup on our html file
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Protected method for clearing the content from recipe container before another content come
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
  </div>`;

    //Setting the parent element inner html to none
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  //If we don't pass any argument to the following function then it will have a default recipe not found
  //error message
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;

    //Clearing the parent element
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Below is the function for showing the other messages like success messages👇

  renderMessage(message = this._message) {
    const markup = `<div class="message">
  <div>
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;

    //Clearing the parent element
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
