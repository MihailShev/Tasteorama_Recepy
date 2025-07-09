import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logOut } from "../../redux/auth/operations.js";
import css from "./Header.module.css";
import logo from "/logo/vite.svg";
import LogoutModal from "./LogoutModal.jsx";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    await dispatch(logOut());
    navigate("/");
    setMenuOpen(false);
    setShowLogoutModal(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const handleLinkClick = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Link className={css.logo} to="/" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" />
          <span className={css.logoText}>Tasteorama</span>
        </Link>

        <button
          className={css.burger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${css.nav} ${menuOpen ? css.open : ""}`}>
          <button
            className={css.closeBtn}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg className={css.closeIcon} width="32" height="32">
              <use href="/img/svg/icons.svg#icon-close-mob-menu-btn" />
            </svg>
          </button>

          <Link
            to="/"
            className={`${css.link} ${location.pathname === "/" ? css.active : ""}`}
            onClick={handleLinkClick}
          >
            Recipes
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile/own"
                className={`${css.link} ${location.pathname === "/profile/own" ? css.active : ""}`}
                onClick={handleLinkClick}
              >
                My Profile
              </Link>
              <Link
                to="/add-recipe"
                className={css.addBtn}
                onClick={handleLinkClick}
              >
                Add Recipe
              </Link>

              <div className={css.userBlock}>
                <div className={css.avatar}>{user.name?.[0]}</div>
                <span className={css.userName}>{user.name}</span>
                <button
                 onClick={() => {
                  setMenuOpen(false);
                  setShowLogoutModal(true);
                }}                
                  className={css.logoutIcon}
                  title="Logout"
                >
                  <svg className={css.iconLOgOut} width="20" height="20">
                    <use href="/img/svg/icons.svg#icon-logout" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className={`${css.link} ${location.pathname === "/auth/login" ? css.active : ""}`}
                onClick={handleLinkClick}
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className={css.registerBtn}
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Модалка выхода */}
        {showLogoutModal && (
          <LogoutModal
            onClose={() => setShowLogoutModal(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    </header>
  );
}
