import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create axios instance with base URL and support for cookies
const axiosInstance = axios.create({
  baseURL: "https://recepy-api.onrender.com", // Check if the URL is correct
  withCredentials: true, // Allow credentials (cookies) with requests
});

// Function to set the Authorization header
const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// Function to clear the Authorization header
const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/register",
        credentials
      );

      // Set the Authorization header with the received token
      setAuthHeader(response.data.data.accessToken);

      // Return the user data and access token
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

// Login user
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", credentials);

      // Set the Authorization header with the received token
      setAuthHeader(response.data.token);
      localStorage.setItem("accessToken", response.data.token); // Store the token in localStorage

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

// Logout user
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post("/api/auth/logout");
    clearAuthHeader(); // Clear the Authorization header after logout
    localStorage.removeItem("accessToken"); // Remove the token from localStorage
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

// Refresh token
export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/api/auth/refresh");
    setAuthHeader(response.data.token); // Update the Authorization header with the new token
    localStorage.setItem("accessToken", response.data.token); // Store the new token

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
