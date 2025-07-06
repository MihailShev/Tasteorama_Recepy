import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://recepy-api.onrender.com/api";

export const fetchCategories = createAsyncThunk(
  'filters/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/categories/all');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const fetchIngredients = createAsyncThunk(
    'filters/fetchIngredients',
    async(_, thunkAPI) => {
        try {
            const response = await axios.get('/ingredients');
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)