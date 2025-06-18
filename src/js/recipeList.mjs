export function renderRecipeList(recipes, id = 'recipe-results') {
  const recipeList = document.getElementById(id);
  recipeList.innerHTML = "";

  if (recipes.length === 0) {
    recipeList.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const recipeItem = document.createElement("div");
    recipeItem.className = "recipe";

    const recipeTitle = document.createElement("h3");
    recipeTitle.textContent = recipe.strMeal;

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = `Image of ${recipe.strMeal}`;

    const recipeLink = document.createElement("a");
    recipeLink.className = "button";
    recipeLink.href = `/recipe/index.html?id=${recipe.idMeal}`;
    recipeLink.textContent = "View Recipe";

    const details = document.createElement("div");
    details.className = "details";
    details.appendChild(recipeTitle);
    details.appendChild(recipeLink);

    recipeItem.appendChild(recipeImage);
    recipeItem.appendChild(details);

    recipeList.appendChild(recipeItem);
  });
}

export function resetCategoryDropdown() {
  const toggle = document.getElementById('categoryDropdownButton');
  const menu = document.getElementById('categoryDropdownMenu');

  toggle.textContent = "Category";
  toggle.dataset.value = "";
  menu.style.display = 'none';
}

export function resetAreaDropdown() {
  const toggle = document.getElementById('areaDropdownButton');
  const menu = document.getElementById('areaDropdownMenu');

  toggle.textContent = "Area";
  toggle.dataset.value = "";
  menu.style.display = 'none';
}

export function resetTypeDropdown() {
  const toggle = document.getElementById('typeDropdownButton');
  const menu = document.getElementById('typeDropdownMenu');

  toggle.textContent = "Type";
  toggle.dataset.value = "";
  menu.style.display = 'none';
}
