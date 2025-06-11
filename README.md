# Nutriwise

## Overview:

The goal of this project is to create a responsive web application that allows users to explore a wide variety of recipes and also view detailed nutritional information for each meal. While many recipe platforms provide cooking instructions, they often omit nutritional data, which is essential for health-conscious users or those with dietary restrictions.

## Target Audience:

Target audience could people such as the following:

- Health-conscious individuals tracking dietary intake
- Home cooks wanting to better understand what they’re eating
- Fitness enthusiasts planning balanced meals
- People with dietary restrictions or allergies
- Students and busy professionals looking for quick, nutritious meals

## Major Functions:

The application will include the following major functions:

1) Recipe search by keyword
    - Users can enter keywords names to search for matching recipes.
2) Recipe search by main ingredient
    - Users can enter an ingredient which will be the main part of the meal. Eg. Chicken.
3) Recipe search by category
    - Users can browse available recipes by the category. Eg. Seafood
4) Recipe search by area/ethnicity
    - Users can browse available recipes by the area. Eg. Italian
5) Detailed view of meal
    - Users can view a meal including its recipe
6) Detailed nutritional breakdown of a meal
    - Users can view a meal and then request to view its nutritional breakdown
7) Recipe Favourites
    - Users can mark particular recipes as favourites to find again later
8) Random Meal Idea
    - Users can request a random recipe idea for when they’re unsure what to make

## External Data:

TheMealDBLinks to an external site will be used to fetch the recipes and filter by various methods. Recipes will be favourited, and will be stored in the browser’s localstorage.

Edamam Nutrition APILinks to an external site will be used to submit a list of ingredients. The response will include a breakdown of the meal. This will be returned and shown to the user

## Module List:

Search Module - This will handle user queries to MealDBLinks and support filtering

Recipe List Module - This will handle rendering the responses which could come back from the search module

Recipe Show Module - This will handle rendering the dedicated pages for a recipe/meal once it has been clicked on to see more information.

Nutrition Module - This will query Edamam Nutrition with the recipe ingredients to get the nutritional break down

Favourites Module - This will handle things like storing/removing favourite meals.

## Graphic Identity:

For our graphic identity we want to use something fun. We’ve decided the app icon, or logo, will be a watermelon and hence our colours will follow a fun theme around this:

| Purpose         | Color            | Hex Code | Notes                                                  |
|-----------------|------------------|----------|--------------------------------------------------------|
| Primary         | Watermelon Red   | #FC5A8D  | Juicy, eye-catching – used for buttons or headers      |
| Accent          | Watermelon Green | #7ED957  | Used for hover effects, highlights, or call-to-actions |
| Dark Accent     | Rind Green       | #297045  | Used for headers, nav bar, footer, or contrast         |
| Background Light| Soft Cream       | #FFF9F0  | Used for background – gives a clean, food-safe feel    |
| Text Base       | Charcoal Grey    | #333333  | Clear, neutral for body text                           |
| Secondary       | White            | #FFFFFF  | For cards, recipe backgrounds, or spacing elements     |

For our body font we will use Lato since it feels highly readable
