const url = import.meta.env.VITE_MEALDB_API_ENDPOINT;

function addSpinner(element) {
  element.innerHTML = `
    <div class="spinner span-3">
      <p>Loading...</p>
      <div class="loader"></div>
    </div>
  `;
}

export async function fetchRecipe(id) {
  const element = document.getElementsByClassName('container')[0];

  addSpinner(element);

  const response = await fetch(`${url}/lookup.php?i=${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  if (!data.meals || data.meals.length === 0) {
    window.location.href = "/";
  }

  return data.meals[0];
}

export async function fetchRandomRecipe() {
  const element = document.getElementById('recipe-suggestion');

  addSpinner(element);

  const response = await fetch(`${url}/random.php`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return data.meals[0];
}

export function renderRecipe(container, recipe) {
  container.innerHTML = `
    <div class="recipe-header">
      <h2 class="recipe-name">${recipe.strMeal}</h2>
      <svg id="favourite" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </div>
    <div class="recipe-description">
      <div>
        <p><strong>Category: </strong>${recipe.strCategory}</p>
        <p><strong>Area: </strong>${recipe.strArea}</p>
        <h3>Ingredients</h3>
        <ul>
          ${Array.from({ length: 20 }, (_, i) => {
            const ingredient = recipe[`strIngredient${i + 1}`];
            const measure = recipe[`strMeasure${i + 1}`];
            return ingredient ? `<li>${measure} ${ingredient}</li>` : '';
          }).join('')}
        </ul>
      </div>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
    </div>
    <div class="recipe-instructions">
      <h3>Instructions</h3>
      <p>${recipe.strInstructions}</p>
    </div>
    <div id="recipe-nutrition-header">
      <h3>Nutritional Information</h3>
    </div>
    <div id="recipe-nutrition">
    </div>
  `;
}

export function renderRandomRecipe(container, recipe) {
  container.innerHTML = `
    <h2>Looking to try something new?</h2>
    <div class="recipe-card">
      <div>
        <h3>${recipe.strMeal}</h3>
        <p><strong>Category: </strong>${recipe.strCategory}</p>
        <p class="mb-auto"><strong>Area: </strong>${recipe.strArea}</p>
        <a href="/recipe/index.html?id=${recipe.idMeal}" class="button">View Recipe</a>
      </div>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
    </div>
  `;
}
