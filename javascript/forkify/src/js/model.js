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

    console.log(state.recipe);
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
