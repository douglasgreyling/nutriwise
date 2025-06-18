import { loadHeaderFooter } from './utils.mjs';
import { searchByMealName, searchByNameAndCategory, searchByNameAndArea, searchByIngredient, populateCategoryOptions, populateAreaOptions } from './search.mjs';
import { renderRecipeList, resetCategoryDropdown, resetAreaDropdown } from './recipeList.mjs';
import { fetchRandomRecipe, renderRandomRecipe } from './recipeShow.mjs';
import { renderFavourites } from './favourites.mjs';

loadHeaderFooter();
populateCategoryOptions();
populateAreaOptions();

const suggestion = await fetchRandomRecipe();
const suggestionElement = document.getElementById("recipe-suggestion");
const redoButton = document.getElementById("suggestion-button");

renderRandomRecipe(suggestionElement, suggestion);

redoButton.addEventListener("click", async () => {
  const newSuggestion = await fetchRandomRecipe();
  renderRandomRecipe(suggestionElement, newSuggestion);
});

const searchForm = document.getElementById("search-form");

async function handleSearch(event) {
  event.preventDefault();

  if (event?.submitter?.id === 'categoryDropdownButton') return;
  if (event?.submitter?.id === 'areaDropdownButton') return;
  if (event?.submitter?.id === 'typeDropdownButton') return;

  const query = event.target[0].value.trim();
  const category = event.target[1].dataset.value;
  const area = event.target[2].dataset.value;
  const type = event.target[3].dataset.value;

  let recipes = [];

  if (category) {
    resetAreaDropdown();
    resetTypeDropdown();

    recipes = await searchByNameAndCategory(query, category);
  } else if (area) {
    resetCategoryDropdown();
    resetTypeDropdown();

    recipes = await searchByNameAndArea(query, area);
  } else if (query.length > 0) {
    resetCategoryDropdown();
    resetAreaDropdown();

    if (type === 'ingredient') {
      recipes = await searchByIngredient(query);
    } else {
      recipes = await searchByMealName(query);
    }
  }

  renderRecipeList(recipes);
}

searchForm.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();

    handleSearch({ target: searchForm, preventDefault: () => {} });
  }
});

searchForm.addEventListener("submit", handleSearch);

const cToggle = document.getElementById('categoryDropdownButton');
const cMenu = document.getElementById('categoryDropdownMenu');

cToggle.addEventListener('click', () => {
  cMenu.style.display = cMenu.style.display === 'block' ? 'none' : 'block';
});

cMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    cToggle.textContent = event.target.textContent;
    cToggle.dataset.value = event.target.dataset.value;
    cMenu.style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    cMenu.style.display = 'none';
  }
});

const aToggle = document.getElementById('areaDropdownButton');
const aMenu = document.getElementById('areaDropdownMenu');

aToggle.addEventListener('click', () => {
  aMenu.style.display = aMenu.style.display === 'block' ? 'none' : 'block';
});

aMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    aToggle.textContent = event.target.textContent;
    aToggle.dataset.value = event.target.dataset.value;
    aMenu.style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    aMenu.style.display = 'none';
  }
});

const tToggle = document.getElementById('typeDropdownButton');
const tMenu = document.getElementById('typeDropdownMenu');

tToggle.addEventListener('click', () => {
  tMenu.style.display = tMenu.style.display === 'block' ? 'none' : 'block';
});

tMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    tToggle.textContent = event.target.textContent;
    tToggle.dataset.value = event.target.dataset.value;
    tMenu.style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    tMenu.style.display = 'none';
  }
});

const favouritesElement = document.getElementById("favourites");

renderFavourites(favouritesElement);
