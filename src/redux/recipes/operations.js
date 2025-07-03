import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://recepy-api.onrender.com/api";

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/recipes');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);