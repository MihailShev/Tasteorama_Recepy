import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../index.js";

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ category, ingredient, title }, thunkAPI) => {
    const params = {};
    if (category) params.category = category;
    if (ingredient) params.ingredient = ingredient;
    if (title) params.title = title;

    try {
      const response = await api.get('/api/recipes', { params });
      const responseData = response.data.data;
      const items = responseData.data.map(({ createdAt, updatedAt, ...rest }) => rest);

      return {
        items,
        page: responseData.page,
        perPage: responseData.perPage,
        totalItems: responseData.totalItems,
        totalPage: responseData.totalPage,
        hasNextPage: responseData.hasNextPage,
        hasPrevPage: responseData.hasPrevPage,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);