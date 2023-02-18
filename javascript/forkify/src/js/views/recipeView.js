//importing icons.svg file so that parcel could load the image also
//icons is the link the of the icons.svg file

import icons from "url:../../img/icons.svg"; //parcel v2

//importing the fractional package to make 0.5 ->1/2 and 1.5 -> 1 1/2 (it is just analogy, but it
//can be used for many other purposes)

import Fraction from "fractional";
import { mark } from "regenerator-runtime";

console.log(Fraction);

class RecipeView {
  //recipe container element👇
  #parentElement = document.querySelector(".recipe");

  //data field will store the data of recipes fetched by model.js
  #data;

  //errorMessage is the default error message, when the recipe is not found
  #errorMessage = "We could not find that recipe. Please try another one!";
  
  #message = "";

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();

    //Clearing the content from recipe container
    this.#clear();

    //Inserting the html markup on our html file
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Private method for clearing the content from recipe container before another content come
  #clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
  </div>`;

    //Setting the parent element inner html to none
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  //If we don't pass any argument to the following function then it will have a default recipe not found
  //error message
  renderError(message = this.#errorMessage) {
    const markup = `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;

    //Clearing the parent element
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Below is the function for showing the other messages like success messages👇

  renderMessage(message = this.#message) {
    const markup = `<div class="message">
  <div>
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;

    //Clearing the parent element
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    //adding event listener for hashchange and load event, so that the recipe will load whenever the
    //recipe id changes or a new page loads with recipe id

    //A concise way to use event listeners (use arrays of event and then apply loop over them)

    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  //We are using private method below, but it will be taken care of by babel
  #generateMarkup() {
    return `
    <figure class="recipe__fig">
    
      <img src="${this.#data.image}" alt="Tomato" clthis.#data__img" />
      <h1 class="recipe__title">
        <span>${this.#data.title}</span>
      </h1>
    </figure>
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this.#data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this.#data.servings
        }</span>
        <span class="recipe__info-text">servings</span>
        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">

      ${this.#data.ingredients.map(this.#generateMarkupIngredient).join("")}  
      
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">0.5</div>
          <div class="recipe__description">
            <span class="recipe__unit">cup</span>
            ricotta cheese
          </div>
        </li>
      </ul>
    </div>
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this.#data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#data.sourceUrl}"
        target="_blank"
      > 
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }

  //A private method for generating the markup for ingredients
  #generateMarkupIngredient(ing) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? new Fraction.Fraction(ing.quantity) : ""
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>`;
  }
}

//Exporting the object made using RecipeView class in order to avoid exposing the real class and thus
//avoid any risk of mutating the private data, because the objects made by RecipeView class will not
//have access to the privated fields of the class

export default new RecipeView();
