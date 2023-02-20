import { async } from "regenerator-runtime";

//importing the config.js
import { API_URL, RES_PER_PAGE } from "./config";

//importing the helpers.js
import { getJSON } from "./helpers";

//state object contains all the data we need in order to build our application👇
export const state = {
  recipe: {},

  //search object will contain the data about about search query and search results when user will
  //search about a recipe

  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

//A function to load recipes👇 and exporting it as named export

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    //Destructoring the object to get the recipe data
    const { recipe } = data.data;

    //making a recipe object to store the data of loaded recipe
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    //Checking if the recipe which is being loaded from api call is bookmarked before
    //For doing this we used array method some() which will return true if any of the array element
    //matches the specified test condition and then we will mark that recipe as bookmarked

    //We are doing this because for every api call for recipe the bookmarked value for the recipe
    //will get removed and to overcome this we have to store the id of the recipes which are bookmarked
    //by the user and then checking if the recipe which is being loaded from api call is bookmarked before

    //adding the bookmarked property whenever the new recipe is loaded
    if (state.bookmarks.some((b) => b.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    ////Temporary error handling
    // console.error(`${error.message} 😔😔😔`);

    //If we get error here then this loadRecipe() promise will not get rejected, therefore in controller.js
    //we will never enter the catch block in control recipe async function, so in order to catch that error
    //we are rethrowing this error

    //Rethrowing the error
    throw error;
  }
};

//function for loading the search results which take a query as a parameter

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    //Storing the search results into the state.search.results array using map method
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    alert(error.message);
    throw error;
  }
};

//Function to getting only 10 results per page

export const getSearchResultsPage = function (page = state.search.page) {
  //Updating the value of page
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9

  //slice doesn't include last index
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //newQuantity = oldQuantity*newServings / oldServings // => 2 * 8 / 4 = 4
  });
  //updating the servings to newServings
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //Add bookmarks
  state.bookmarks.push(recipe);

  //Marking current recipe as bookmarked
  //Checking if the current recipe(state.recipe) is equal to the bookmarked recipe

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

//Unbookmarking the recipe using the following function
export const deleteBookmark = function (id) {
  //1) finding the index of the item where the id of the recipe is equal to the id passed as argument
  //in the function
  const index = state.bookmarks.findIndex((el) => el.id === id);
  //2) deleting the bookmark
  state.bookmarks.splice(index, 1);

  //Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) { 
    state.recipe.bookmarked = false;
  }
};
