import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logOut } from "../../redux/auth/operations.js";
import css from "./Header.module.css";
import { LogOut } from "lucide-react"; 
import logo from "/logo/vite.svg";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logOut());
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Link className={css.logo} to="/">
          <img src={logo} alt="Logo" />
          <span className={css.logoText}>Tasteorama</span>
        </Link>

        <button
  className={css.burger}
  onClick={toggleMenu}
  aria-label="Toggle menu"
>
  {menuOpen ? (
    <span className={css.closeIcon}>&times;</span>
  ) : (
    <>
      <span></span>
      <span></span>
      <span></span>
    </>
  )}
</button>

        <nav className={`${css.nav} ${menuOpen ? css.open : ""}`}>
          <Link to="/" className={css.link}>Recipes</Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile/own" className={css.link}>My Profile</Link>
              <Link to="/add-recipe" className={css.addBtn}>Add Recipe</Link>

              <div className={css.userBlock}>
                <div className={css.avatar}>{user.name?.[0]}</div>
                <span className={css.userName}>{user.name}</span>
                <button onClick={handleLogout} className={css.logoutIcon} title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth/login" className={css.link}>Log in</Link>
              <Link to="/auth/register" className={css.registerBtn}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
