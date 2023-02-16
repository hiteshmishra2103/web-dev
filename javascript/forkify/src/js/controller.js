//Importing model
import * as model from "./model.js";

// import icons from '../img/icons.svg' //importing files in parcel v1

//importing core-js package for polyfilling
import "core-js/stable";
import "regenerator-runtime";

//Importing recipe view from recipeview.js👇
//This file will help us to render recipes
import recipeView from "./views/recipeView.js";

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

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    //Checking if id is empty (guard clause)
    if (!id) return;
    //Before loading the recipe the spinner should be rendered
    recipeView.renderSpinner();

    //1) Loading the recipe
    await model.loadRecipe(id); //It will give us access to the state.recipe object


    //2) Rendering the loaded recipe and setting the values of respective fields using the recipe object

    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error.message);
  }
};

//adding event listener for hashchange and load event, so that the recipe will load whenever the
//recipe id changes or a new page loads with recipe id

//A concise way to use event listeners (use arrays of event and then apply loop over them)

["hashchange", "load"].forEach((e) => window.addEventListener(e, controlRecipes));

// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
