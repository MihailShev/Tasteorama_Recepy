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
    console.log(accessToken);

    localStorage.setItem("accessToken", accessToken);
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      user,
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
  async ({ recipeId, token }, thunkAPI) => {
    try {
      const response = await api.post(
        `/api/recipes/favorites/${recipeId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data._id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const removeFavorite = createAsyncThunk(
  "api/recipes/removeFavorites",
  async ({ recipeId, token }, thunkAPI) => {
    try {
      const url = `https://recepy-api.onrender.com/api/recipes/favorites/${recipeId}`;
      const response = await api.delete(
        `/api/recipes/favorites/${recipeId}`,
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.recipeId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
