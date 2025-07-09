import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../index.js";
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/api/auth/register", credentials);
      const { name, email, favorites, accessToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify({ name, email, favorites }));
      return {
        user: { name, email, favorites: favorites || [] },
        token: accessToken,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      const { name, email, favorites, accessToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify({ name, email, favorites }));
      return {
        user: { name, email, favorites: favorites || [] },
        token: accessToken,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/api/auth/logout");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const response = await api.post("/api/auth/refresh");
    const { accessToken } = response.data.data;

    localStorage.setItem("accessToken", accessToken);
    return {
      token: accessToken,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Refresh failed";
    return thunkAPI.rejectWithValue(message);
  }
});
export const addFavorite = createAsyncThunk(
  "api/recipes/favorites",
  async ({ recipeId }, thunkAPI) => {
    try {
      const response = await api.post(`/api/recipes/favorites/${recipeId}`);
      return response.data.data._id;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
  }
);
export const removeFavorite = createAsyncThunk(
  "api/recipes/removeFavorites",
  async ({ recipeId }, thunkAPI) => {
    try {
      const response = await api.delete(`/api/recipes/favorites/${recipeId}`);
      return response.data.data.recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
  }
);
