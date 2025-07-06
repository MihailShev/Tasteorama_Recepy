import { createSelector } from "@reduxjs/toolkit";

const selectItems = (state) => state.filters.items;
const selectSelectedFilters = (state) => state.filters.selectedFilters;


export const selectFiltersLoading = state => state.filters.loading;
export const selectFiltersError = state => state.filters.error;


export const selectCategories = createSelector(
  [selectItems],
  (items) => items?.categories || []
);

export const selectIngredients = createSelector(
  [selectItems],
  (items) => items?.ingredients || []
);


export const selectSelectedCategory = createSelector(
  [selectSelectedFilters],
  (selected) => selected.category
);

export const selectSelectedIngredient = createSelector(
  [selectSelectedFilters],
  (selected) => selected.ingredient
);

export const selectSelectedQuery = createSelector(
  [selectSelectedFilters],
  (selected) => selected.query
);