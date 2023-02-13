// import icons from '../img/icons.svg' //importing files in parcel v 1

//importing icons.svg file so that parcel could load the image also
//icons is the link the of the icons.svg file

import icons from "url:../img/icons.svg"; //parcel v2

//importing core-js package for polyfilling
import "core-js/stable";
import "regenerator-runtime";

// console.log(icons)

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//We have created spinner using animations in css very easily, you can take a look at the files to
//make a one

//Javascript code for rendering a spinner

const renderSpinner = function (parentElement) {
  const markup = `<div class="spinner">
<svg>
  <use href="${icons}#icon-loader"></use>
</svg>
</div>`;

  //Setting the parent element inner html to none
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", markup);
};

const showRecipe = async function () {
  try {
    //Loading the recipe
    //Before loading the recipe the spinner should be rendered

    renderSpinner(recipeContainer);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
    );

    const data = await res.json();

    if (!res.ok) {
      //if the request is failed then throw the error(for ex: if recipe id is wrong)
      throw new Error(`${data.message} (${res.status})`);
    }
    console.log(res, data);

    //Destructoring the object to get the recipe data
    let { recipe } = data.data;

    //making a recipe object to store the data of loaded recipe
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    //Rendering the loaded recipe and setting the values of respective fields using the recipe object
    const markup = `
            <figure class="recipe__fig">
              <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${recipe.title}</span>
              </h1>
            </figure>
            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  recipe.servings
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

              ${recipe.ingredients
                .map((ing) => {
                  return `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>`;
                })
                .join("")}  
              
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
                  recipe.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${recipe.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
            `;

    recipeContainer.innerHTML = "";
    //Inserting the html markup on our html file
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    alert(error.message);
  }
};

showRecipe();
