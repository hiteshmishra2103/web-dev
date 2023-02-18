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

//The recipe container where the recipes are shown to the user(right-hand side section)

const recipeContainer = document.querySelector(".recipe");

//Below is the link to the address of the api used for fetching data

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//We have created spinner using animations in css very easily, you can take a look at the files to
//make a one

//Javascript code for rendering a spinner

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    
    //Checking if id is empty (guard clause)
    if (!id) return;

    console.log(id);
    
    //Before loading the recipe the spinner should be rendered
    recipeView.renderSpinner();

    //1) Loading the recipe
    await model.loadRecipe(id); //It will give us access to the state.recipe object

    //2) Rendering the loaded recipe and setting the values of respective fields using the recipe object
    
    recipeView.render(model.state.recipe);
  } catch (error) {
    // alert(error.message);
    //We will not pass the error message here when the recipe with specified id is not found, because
    //it is the view which should take care of that, to do this we will make a private field error
    //message which will

    recipeView.renderError();
  }
};

//Implementing the publisher-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

//Calling the init() to call the addHandlerRender function
init();
