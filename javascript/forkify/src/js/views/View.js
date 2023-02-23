//this file contains the class fields and methods which are common in all the views which will help
//us to follow the DRY(Do Not Repeat Yourself) and we will achieve that by inheritance⭐⭐⭐

//In short the View class is the parent class of all other classes related to views such recipeView,
//resultsView and the fields and methods which are different in other files they will not be included
//in this class

import icons from "url:../../img/icons.svg"; //parcel v2

export default class View {
  //data field will store the data of recipes fetched
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View object instance
   * @author Hitesh Mishra
   */

  render(data, render = true) {
    //It will throw the error when the data is not fetched or if the data is fetched but the data array
    //is empty, because in case of inappropriate search query the data is also fetched but the array is
    //empty
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    //we have to set the data property, that's why we didn't directly generated markup
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }

    //Clearing the content from recipe container
    this._clear();

    //Inserting the html markup on our html file
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //DOM UPDATION Algorithm

  /**
   * Update the markup if the the markup changes to avoid reloading and downloading
   * resources required for new data
   * @param {Object} data The data which is changed will be updated on the page
   * @returns {undefined}
   */

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    //below code will convert the newMarkup string into real DOM NODE List object 👇
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = newDOM.querySelectorAll("*");

    const curElements = this._parentElement.querySelectorAll("*");

    //comparing the curElements and updating the values of elements to new one acc to the
    //updated servings⭐⭐

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //checking if the content in the newDOM and oldDOM is equal, we use isEqualNode() for this
      //It checks whether the content of the both the nodes are equal or not

      // console.log(curEl, newEl.isEqualNode(curEl));

      //if newEl and curEl have not same content then update changed text 👇
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        //Updating the elements whose values are changed
        curEl.textContent = newEl.textContent;
      }

      //Updates changed (data-) attributes

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          //replacing the attributes in the curEl by the attributes coming from the newEl
          curEl.setAttribute(attr.name, attr.value)
        );
        // console.log(newEl.attributes);
      }
    });

    // console.log(curElements);

    // console.log(newElements);
  }

  /**
   * Protected method for clearing the content from recipe container before another content come
   * @param {undefined}
   * @returns {undefined}
   */

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

  /**
   *
   * @param {string} [message='error message'] 
   */
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
