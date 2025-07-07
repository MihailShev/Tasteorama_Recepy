import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import css from "./Footer.module.css";
import logo from "/logo/vite.svg";

export default function Footer() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/profile/own");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <footer className={css.footer}>
      <div className={`container ${css.inner}`}>
        <div className={css.logoBlock}>
          <img src={logo} alt="Logo" className={css.logo} />
          <span className={css.logoText}>Tasteorama</span>
        </div>

        <p className={css.copyright}>
          © 2025 CookingCompanion. All rights reserved.
        </p>

        <nav className={css.nav}>
          <Link to="/" className={css.link}>Recipes</Link>
          <button onClick={handleAccountClick} className={css.link}>
            Account
          </button>
        </nav>
      </div>
    </footer>
  );
}
