import * as model from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import View from './views/View.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //0 resulst view update

    resultsView.update(model.getSearchResults());

    await model.loadRecipe(id);

    //stpe 2
    //rendering
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmark);
  } catch (error) {
    recipeView.renderError();
    console.error(`Semething is wrong with request ${error} 🔥🔥🔥🔥`);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //geting the query
    const query = searchView.getQuery();

    if (!query) return;
    await model.loadSearchResults(query);

    //render Results
    resultsView.render(model.getSearchResults());

    //pagintation buttons

    paginationView.render(model.state.search);

    //claer search field

    //render
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (pageNum) {
  resultsView.render(model.getSearchResults(pageNum));

  //pagintation buttons
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  //1 update resepie serving UI;
  model.updateServings(servings);

  //2 update view on recipes on UI
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarksView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show loadinng spinner
    addRecipeView.renderSpinner();

    // console.log(newRecipe);

    await model.uploadRecipe(newRecipe);

    //render new recipe

    recipeView.render(model.state.recipe);

    //RENDER BOOKMARK VIEW
    bookmarksView.render(model.state.bookmark);

    ///CHANGE ID IN URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //success massage
    addRecipeView.renderMassage();

    //close the form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('🔥', err);
    addRecipeView.renderError(err.message);
  }

  // uplaod new recipe data
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerAddBookMark(controlAddBookmark);
  paginationView.addClikcHandler(controlPagination);
  recipeView.addHandelerUpdateServings(controlServings);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
