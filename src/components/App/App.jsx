import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import MainPage from "../../pages/MainPage/MainPage.jsx";
// import RecipeViewPage from "../../pages/RecipeViewPage/RecipeViewPage.jsx";
// import AddRecipePage from "../../pages/AddRecipePage/AddRecipePage.jsx";
// import ProfilePage from "../../pages/ProfilePage/ProfilePage.jsx";
import AuthPage from "../../pages/AuthPage/AuthPage.jsx";

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="auth/:authType" element={<AuthPage />} />

        {/* <Route path="" element={<RecipeViewPage />} /> */}

        {/* <Route path="" element={<AddRecipePage />} /> */}

        {/* <Route path="" element={<ProfilePage />} /> */}
      </Routes>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
