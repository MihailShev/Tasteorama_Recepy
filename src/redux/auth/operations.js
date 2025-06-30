import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://recepy-api.onrender.com", 
  withCredentials: false, 
});

const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/register", credentials);
      setAuthHeader(response.data.data.accessToken);
      return {
        user: response.data.data,
        accessToken: response.data.data.accessToken,
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
      const response = await axiosInstance.post("/api/auth/login", credentials);
      setAuthHeader(response.data.token);
      localStorage.setItem("accessToken", response.data.token); 
      return {
        user: response.data,
        token: response.data.token,
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
    await axiosInstance.post("/api/auth/logout");
    clearAuthHeader(); 
    localStorage.removeItem("accessToken"); 
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/api/auth/refresh");
    setAuthHeader(response.data.token); 
    localStorage.setItem("accessToken", response.data.token); 
    return {
      user: response.data,
      token: response.data.token,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Refresh failed";
    return thunkAPI.rejectWithValue(message);
  }
});
