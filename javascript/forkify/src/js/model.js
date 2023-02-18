import { async } from "regenerator-runtime";

//importing the config.js
import { API_URL } from "./config";

//importing the helpers.js
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
};

//A function to load recipes👇 and exporting it as named export

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

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