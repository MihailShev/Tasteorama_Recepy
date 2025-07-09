import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout/Layout.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";

const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const RecipeViewPage = lazy(() => import("../../pages/RecipeViewPage/RecipeViewPage.jsx"));
const AddRecipePage = lazy(() => import("../../pages/AddRecipePage/AddRecipePage.jsx"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage.jsx"));
const AuthPage = lazy(() => import("../../pages/AuthPage/AuthPage.jsx"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />

          <Route path='recipes/:id' element={<RecipeViewPage />} />

          <Route path='auth/:authType' element={<AuthPage />} />

          <Route
            path='add-recipe'
            element={
              <PrivateRoute>
                <AddRecipePage />
              </PrivateRoute>
            }
          />

          <Route
            path='profile/:recipeType'
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path='*'
            element={
              <NotFound>
                <p>Page not found</p>
              </NotFound>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
