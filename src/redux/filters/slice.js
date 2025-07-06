import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients, fetchCategories } from "./operations";

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    items: {
        categories: [],
        ingredients: [],
    },
    selectedFilters: {
      category: '',
      ingredient: '',
      query: '',
    },
    loading: false,
    error: false
  },
    reducers: {
    setSelectedCategory(state, action) {
      state.selectedFilters.category = action.payload;
    },
    setSelectedIngredient(state, action) {
      state.selectedFilters.ingredient = action.payload;
    },
    setSelectedQuery(state, action) {
      state.selectedFilters.query = action.payload;
    },
    resetSelectedFilters(state) {
      state.selectedFilters = {
        category: '',
        ingredient: '',
        query: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
        .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const {
  setSelectedCategory,
  setSelectedIngredient,
  resetSelectedFilters,
  setSelectedQuery
} = filtersSlice.actions;

export default filtersSlice.reducer;
