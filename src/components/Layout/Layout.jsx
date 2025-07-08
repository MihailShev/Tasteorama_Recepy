import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import style from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={style.layoutWrapper}>
      <Header />
      <main className={style.layoutContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
