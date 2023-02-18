import { async } from "regenerator-runtime";

//importing the config.js
import { API_URL } from "./config";

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

