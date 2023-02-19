//importing core-js package for polyfilling/transpiling
import "core-js/stable";

import "regenerator-runtime";

import { async } from "regenerator-runtime";

//Importing model
import * as model from "./model.js";

//Importing recipe view from recipeview.js👇
//This file will help us to render recipes
import recipeView from "./views/recipeView.js";

//importing the searchView file
import searchView from "./views/searchView.js";

//importing the ResultsView file
import resultsView from "./views/resultsView.js";

//Importing paginationView file
import paginationView from "./views/paginationView.js";

// //Activating the hot module reloading
// //It will automatically update modules in the browser
// //at runtime without needing a whole page refresh👇

// if (module.hot) {
//   module.hot.accept();
// }

//The recipe container where the recipes are shown to the user(right-hand side section)

const recipeContainer = document.querySelector(".recipe");

//Below is the link to the address of the api used for fetching data

// https://forkify-api.herokuapp.com/v2

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

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query

    //Getting the search query from the user by calling getQuery() from the searchView.js file
    const query = searchView.getQuery();

    //If there is not query then return,(guard clause)
    if (!query) return;

    // 2)Load search results
    await model.loadSearchResults(query);

    //3) Rendering the results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //We will render the pagination buttons after the recipes are loaded on the page

    //4) Rendering the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

//function for controlling the pagination, whenever the pagination button will be clicked then
//the following function will be called👇 and it render the recipes and pagination button acc to
//the button clicked

const controlPagination = function (goToPage) {
  //1) Rendering NEW results
  //render will overwrite the existing content and put new content in that place👇
  resultsView.render(model.getSearchResultsPage(goToPage));

  //We will render the pagination buttons after the recipes are loaded on the page

  //2) Rendering the NEW pagination buttons
  paginationView.render(model.state.search);
};

//Implementing the publisher-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

//Calling the init() to call the addHandlerRender function
init();
