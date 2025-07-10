import axios from "axios";
import { setCredentials, logout } from "../redux/auth/slice.js";

export const api = axios.create({
  baseURL: "https://recepy-api.onrender.com",
  withCredentials: true,
});

let storeRef;
export const injectStore = (store) => {
  storeRef = store;
};

api.interceptors.request.use((config) => {
  const token = storeRef?.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      original.url !== "/api/auth/refresh"
    ) {
      original._retry = true;
      try {
        const response = await api.post("/api/auth/refresh");
        const { accessToken } = response.data.data;
        const user = JSON.parse(localStorage.getItem("user"));
        storeRef?.dispatch(setCredentials({ user, token: accessToken }));
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch {
        storeRef?.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);
