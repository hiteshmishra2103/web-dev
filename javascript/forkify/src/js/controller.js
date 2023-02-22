//importing core-js package for polyfilling/transpiling
import "core-js/stable";

import "regenerator-runtime";

import { async } from "regenerator-runtime";

//Importing model
import * as model from "./model.js";

//importing modal_close_sec form config.js
import { MODAL_CLOSE_SEC } from "./config.js";

//Importing recipe view from recipeview.js👇
//This file will help us to render recipes
import recipeView from "./views/recipeView.js";

//importing the searchView file
import searchView from "./views/searchView.js";

//importing the ResultsView file
import resultsView from "./views/resultsView.js";

//importing the bookmarksView file
import bookmarksView from "./views/bookmarksView.js";

//Importing paginationView file
import paginationView from "./views/paginationView.js";

import addRecipeView from "./views/addRecipeView.js";

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

    // console.log(id);

    //Before loading the recipe the spinner should be rendered
    recipeView.renderSpinner();

    //0) Update results view to mark selected
    resultsView.update(model.getSearchResultsPage());

    //1) updating the bookmarks view

    bookmarksView.update(model.state.bookmarks);

    //2) Loading the recipe
    await model.loadRecipe(id); //It will give us access to the state.recipe object

    //3) Rendering the loaded recipe and setting the values of respective fields using the recipe object

    recipeView.render(model.state.recipe);
  } catch (error) {
    // alert(error.message);
    //We will not pass the error message here when the recipe with specified id is not found, because
    //it is the view which should take care of that, to do this we will make a private field error
    //message which will

    recipeView.renderError();
    console.error(error);
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

//function for updating recipe servings, it will be executed when user clicks on increasing or decreasing
//the servings("+" or "-")

const controlServings = function (newServings) {
  //1) Updating the recipe servings (in state)
  model.updateServings(newServings);

  //2) Updating the recipeview
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//AddBookmark function
const controlAddBookmark = function () {
  //1) Add/remove books

  //bookmarking can only be done if the recipe is not bookmarked before

  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  console.log(model.state.recipe);

  //updating the bookmarked button if recipe is bookmarked
  //the condition of checking if the recipe is bookmarked or not, we have put it into the recipeView.js
  //in _generateMarkup function
  //2) Update recipe view
  recipeView.update(model.state.recipe);

  //3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

//function for rendering the bookmarks
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Success Message
    addRecipeView.renderMessage();

    //Render bookmarks view
    bookmarksView.render(model.state.bookmarks);

    //Change id in url using history api
    //pushState will allow us to change the url without reloading the page
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error("😔" + error.message);
    addRecipeView.renderError(error.message);
  }
};

//Implementing the publisher-subscriber pattern
const init = function () {
  bookmarksView.addHanlderRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

//Calling the init() to call the addHandlerRender function
init();
