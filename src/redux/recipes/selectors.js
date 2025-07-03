import { createSelector } from "@reduxjs/toolkit";

const selectItems = (state) => state.recipes.items;
export const selectRecipesLoading = state => state.recipes.loading;
export const selectRecipesError = state => state.recipes.error;


export const selectRecipes = createSelector(
  [selectItems],
  (items) => items?.data || []
);