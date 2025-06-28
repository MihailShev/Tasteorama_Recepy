import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) =>
    builder

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      })

      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      })

      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      }),
});

export default authSlice.reducer;
