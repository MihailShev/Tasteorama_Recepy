import { Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "../../pages/MainPage/MainPage.jsx";
import RecipeViewPage from "../../pages/RecipeViewPage/RecipeViewPage.jsx";
import AddRecipePage from "../../pages/AddRecipePage/AddRecipePage.jsx";
import ProfilePage from "../../pages/ProfilePage/ProfilePage.jsx";
import AuthPage from "../../pages/AuthPage/AuthPage.jsx";
import Layout from "../Layout/Layout.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import { setCredentials } from "../../redux/auth/slice.js";
import { setAuthHeader } from "../../redux/auth/operations.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      dispatch(setCredentials({ token, user }));
      setAuthHeader(token); 
    }
  }, [dispatch]);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />

          <Route path="recipes/:id" element={<RecipeViewPage />} />

          <Route path="auth/:authType" element={<AuthPage />} />

          <Route
            path="add-recipe"
            element={
              <PrivateRoute>
                <AddRecipePage />
              </PrivateRoute>
            }
          />

          <Route
            path="profile/:recipeType"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
