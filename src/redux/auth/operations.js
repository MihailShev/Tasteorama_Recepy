import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/register", credentials);
      setAuthHeader(`Bearer ${response.data.token}`);
      return response.data;
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
      const response = await axios.post("/api/auth/login", credentials);
      setAuthHeader(`Bearer ${response.data.token}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/api/auth/logout");
    setAuthHeader("");
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});
