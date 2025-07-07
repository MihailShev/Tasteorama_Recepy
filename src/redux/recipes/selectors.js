import { createSelector } from "@reduxjs/toolkit";

const selectRecipes = (state) => state.recipes;
const selectTotalItems = (state) => state.recipes.totalItems;
export const selectRecipesLoading = (state) => state.recipes.loading;
export const selectRecipesError = (state) => state.recipes.error;

export const selectItems = createSelector(
  [selectRecipes],
  (recipes) => recipes?.items || []
);

export const selectTotalRecipes = createSelector(
  [selectTotalItems], 
  (items) => items || 'Found 0'
)