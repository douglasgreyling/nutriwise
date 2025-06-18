const url = import.meta.env.VITE_MEALDB_API_ENDPOINT;

function addSpinner(id) {
  const recipeList = document.getElementById(id);

  recipeList.innerHTML = `
    <div class="spinner span-3">
      <p>Loading...</p>
      <div class="loader"></div>
    </div>
  `;
}

export async function searchByIngredient(query) {
  try {
    addSpinner('recipe-results');

    const response = await fetch(`${url}/filter.php?i=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (query.length > 0) {
      return data.meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(query.toLowerCase())
      );
    }

    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by name and type:", error);

    return [];
  }
}

export async function searchByMealName(query) {
  try {
    addSpinner('recipe-results');

    const response = await fetch(`${url}/search.php?s=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals:", error);

    return [];
  }
}

export async function searchByNameAndCategory(query, category) {
  try {
    addSpinner('recipe-results');

    const response = await fetch(`${url}/filter.php?c=${category}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (query.length > 0) {
      return data.meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(query.toLowerCase())
      );
    }

    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by name and category:", error);

    return [];
  }
}

export async function searchByNameAndArea(query, area) {
  try {
    addSpinner('recipe-results');

    const response = await fetch(`${url}/filter.php?a=${area}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (query.length > 0) {
      return data.meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(query.toLowerCase())
      );
    }

    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by name and area:", error);

    return [];
  }
}

export async function populateCategoryOptions() {
  try {
    const response = await fetch(`${url}/list.php?c=list`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const categories = data.meals;

    const dropdownMenu = document.getElementById("categoryDropdownMenu");
    dropdownMenu.innerHTML = "";

    categories.forEach(category => {
      const li = document.createElement("li");
      li.textContent = category.strCategory;
      li.dataset.value = category.strCategory;
      dropdownMenu.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

export async function populateAreaOptions() {
  try {
    const response = await fetch(`${url}/list.php?a=list`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const areas = data.meals;

    const dropdownMenu = document.getElementById("areaDropdownMenu");
    dropdownMenu.innerHTML = "";

    areas.forEach(area => {
      const li = document.createElement("li");
      li.textContent = area.strArea;
      li.dataset.value = area.strArea;
      dropdownMenu.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching areas:", error);
  }
}
