import {
  loadHeaderFooter,
  getParam,
  setLocalStorage,
  getLocalStorage,
} from './utils.mjs';
import { fetchRecipe, renderRecipe } from './recipeShow.mjs';
import {
  getNutritionData,
  renderNutritionalInformation,
} from './nutrition.mjs';

loadHeaderFooter();

async function loadRecipe() {
  const recipeId = getParam('id');
  const recipe = await fetchRecipe(recipeId);

  const container = document.getElementsByClassName('container')[0];

  renderRecipe(container, recipe);

  const favouriteElement = document.getElementById('favourite');

  const isFavourite = getLocalStorage('favourites')?.some(
    (fav) => fav === recipe.idMeal,
  );

  if (isFavourite) favouriteElement.classList.add('active');

  favouriteElement.addEventListener('click', () => {
    const favourites = getLocalStorage('favourites') || [];

    if (favourites.some((fav) => fav === recipe.idMeal)) {
      const updatedFavourites = favourites.filter((fav) => fav !== recipe.idMeal);
      setLocalStorage('favourites', updatedFavourites);
      favouriteElement.classList.remove('active');
    } else {
      favourites.push(recipe.idMeal);
      setLocalStorage('favourites', favourites);
      favouriteElement.classList.add('active');
    }
  });

  const nutritionData = await getNutritionData(recipe);
  renderNutritionalInformation(nutritionData);
}

loadRecipe();

