import { capitalizeFirstLetter } from "./utils.mjs";

const url = import.meta.env.VITE_NUTRITIONIX_API_ENDPOINT;
const app_id = import.meta.env.VITE_NUTRITIONIX_APP_ID;
const app_key = import.meta.env.VITE_NUTRITIONIX_APP_KEY;

export async function getNutritionData(recipe) {
  let ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "x-app-id": app_id,
      "x-app-key": app_key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: ingredients.join(", "),
      timezone: "US/Eastern"
    })
  })

  if (!response.ok) {
    throw new Error("Failed to fetch nutrition data");
  }

  return await response.json();
}

export function renderNutritionalInformation(nutrition) {
  nutrition['foods'].forEach(food => {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food-item');

    foodElement.innerHTML = `
      <table>
        <tr>
          <th><h4>${capitalizeFirstLetter(food.food_name)}</h4></th>
          <th></th>
        </tr>

        <tbody>
          <tr>
            <td>Calories</td>
            <td>${food.nf_calories} kcal</td>
          </tr>
          <tr>
            <td>Total Fat</td>
            <td>${food.nf_total_fat} g</td>
          </tr>
          <tr>
            <td>Saturated Fat</td>
            <td>${food.nf_saturated_fat} g</td>
          </tr>
          <tr>
            <td>Cholesterol</td>
            <td>${food.nf_cholesterol} mg</td>
          </tr>
          <tr>
            <td>Sodium</td>
            <td>${food.nf_sodium} mg</td>
          </tr>
          <tr>
            <td>Total Carbohydrates</td>
            <td>${food.nf_total_carbohydrate} g</td>
          </tr>
          <tr>
            <td>Dietary Fiber</td>
            <td>${food.nf_dietary_fiber} g</td>
          </tr>
          <tr>
            <td>Sugars</td>
            <td>${food.nf_sugars} g</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>${food.nf_protein} g</td>
          </tr>
        </tbody>
      </table>
    `;

    document.getElementById('recipe-nutrition').appendChild(foodElement);
  });
}