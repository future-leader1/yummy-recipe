import * as model from './module.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    //stpe 2
    //rendering
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.error(`Semething is wrong with request ${error} 🔥🔥🔥🔥`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
