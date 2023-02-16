export const state = {
  recipe: {},
};

//A function to load recipes👇 and exporting it as named export

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await res.json();

    if (!res.ok) {
      //if the request is failed then throw the error(for ex: if recipe id is wrong)
      throw new Error(`${data.message} (${res.status})`);
    }
    console.log(res, data);

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
    alert(error.message);
  }
};
