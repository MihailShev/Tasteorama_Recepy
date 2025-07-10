import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import style from "./Layout.module.css";
import { selectAuthLoading } from "../../redux/auth/selectors.js";
import { selectFiltersLoading } from "../../redux/filters/selectors.js";
import { useSelector } from "react-redux";
import { selectRecipesLoading } from "../../redux/recipes/selectors.js";
import Loader from "../Loader/Loader.jsx";

export default function Layout() {
  const ul = useSelector(selectAuthLoading);
  const fl = useSelector(selectFiltersLoading);
  // const rl = useSelector(selectRecipesLoading);
  const isLoading = ul || fl;

  return (
    <div className={style.layoutWrapper}>
      <Header />

      <main className={style.layoutContent}>
        {isLoading && <Loader />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
