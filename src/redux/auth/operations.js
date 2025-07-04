import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://recepy-api.onrender.com",
  withCredentials: false,
});

export const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/register",
        credentials
      );
      const { name, email, accessToken } = response.data.data;
      setAuthHeader(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify({ name, email }));
      return {
        user: { name, email },
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
      const response = await axiosInstance.post("/api/auth/login", credentials);
      const { name, email, accessToken } = response.data.data;
      setAuthHeader(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify({ name, email }));
      return {
        user: { name, email },
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
    await axiosInstance.post("/api/auth/logout");
    clearAuthHeader();
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
    const response = await axiosInstance.post("/api/auth/refresh");
    const { token, user } = response.data;
    setAuthHeader(token);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    return {
      user,
      token,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Refresh failed";
    return thunkAPI.rejectWithValue(message);
  }
});
