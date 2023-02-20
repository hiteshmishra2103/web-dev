//Importing View.js
import View from "./View";

//importing icons.svg file so that parcel could load the image also
//icons is the link the of the icons.svg file

import icons from "url:../../img/icons.svg"; //parcel v2

//importing the fractional package to make 0.5 ->1/2 and 1.5 -> 1 1/2 (it is just analogy, but it
//can be used for many other purposes)

import Fraction from "fractional";
import { mark } from "regenerator-runtime";

console.log(Fraction);

class RecipeView extends View {
  //recipe container element👇
  _parentElement = document.querySelector(".recipe");

  //errorMessage is the default error message, when the recipe is not found
  _errorMessage = "We could not find that recipe. Please try another one!";

  _message = "";

  addHandlerRender(handler) {
    //adding event listener for hashchange and load event, so that the recipe will load whenever the
    //recipe id changes or a new page loads with recipe id

    //A concise way to use event listeners (use arrays of event and then apply loop over them)

    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (event) {
      const btn = event.target.closest(".btn--update-servings");
      //If the btn is not clicked then go out of the function
      if (!btn) {
        return;
      }
      // console.log(this._data.servings)
      // console.log(btn);
      const updateTo = +btn.dataset.updateTo;

      //the servings will only update when the servings are greater than 1👇
      if (updateTo > 0) {
        handler(updateTo);
      }
    });
  }

  //handler function for handling bookmarks
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (event) {
      const btn = event.target.closest(".btn--bookmark");
      if (!btn) {
        return;
      }

      handler();
    });
  }

  //We are using protected method below, but it will be taken care of by babel
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    
      <img src="${this._data.image}" alt="Tomato" clthis._data__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="recipe__user-generated">
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
        </svg>
      </button>
    </div>
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">

      ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}  
      
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
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
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

  //A protected method for generating the markup for ingredients
  _generateMarkupIngredient(ing) {
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
//avoid any risk of mutating the protected data, because the objects made by RecipeView class will not
//have access to the protectedd fields of the class

export default new RecipeView();
