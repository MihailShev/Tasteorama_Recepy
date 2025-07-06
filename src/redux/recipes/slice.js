import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    loading: false,
    error: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalItems = action.payload.totalItems;
        state.totalPage = action.payload.totalPage;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPrevPage = action.payload.hasPrevPage;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export default recipesSlice.reducer;
