import { Route, Routes } from "react-router";
import { Suspense } from "react";
import MainPage from "../../pages/MainPage/MainPage.jsx";
import RecipeViewPage from "../../pages/RecipeViewPage/RecipeViewPage.jsx";
import AddRecipePage from "../../pages/AddRecipePage/AddRecipePage.jsx";
import ProfilePage from "../../pages/ProfilePage/ProfilePage.jsx";
import AuthPage from "../../pages/AuthPage/AuthPage.jsx";

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="" element={<MainPage />} />

        <Route path="" element={<AuthPage />} />

        <Route path="" element={<RecipeViewPage />} />

        <Route path="" element={<AddRecipePage />} />

        <Route path="" element={<ProfilePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
