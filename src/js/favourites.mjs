import { getLocalStorage } from "./utils.mjs";
import { renderRecipeList } from "./recipeList.mjs";

const url = import.meta.env.VITE_MEALDB_API_ENDPOINT;

function addSpinner(element) {
  element.innerHTML = `
    <div class="spinner span-3">
      <p>Loading...</p>
      <div class="loader"></div>
    </div>
  `;
}

export function getFavourites() {
  const favourites = getLocalStorage("favourites") || [];
  return favourites;
}

export function renderFavourites(element) {
  addSpinner(element);

  document.getElementById('favourites-header').classList.remove('hidden');
  document.getElementById('favourites').classList.remove('hidden');

  const favourites = getFavourites();

  const recipes = [];

  favourites.forEach(id => {
    fetch(`${url}/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          recipes.push(data.meals[0]);
        }
      })
      .catch(error => console.error("Error fetching favourite recipe:", error))
      .finally(() => {
        if (recipes.length === favourites.length) {
          element.innerHTML = "";
          renderRecipeList(recipes, 'favourites');
        }
      });
  });

  if (favourites.length === 0) {
    document.getElementById('favourites-header').classList.add('hidden');
    document.getElementById('favourites').classList.add('hidden');
  }
}
