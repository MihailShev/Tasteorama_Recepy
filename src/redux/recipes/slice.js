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
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export default recipesSlice.reducer;
