import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/auth/operations.js";
import css from "./Header.module.css";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logOut());
    navigate("/");
  };

  return (
    <header>
      <Link className={css.margin} to="/">
        IMG
      </Link>
      {isLoggedIn ? (
        <>
          <Link className={css.margin} to="/">
            RECIPES
          </Link>

          <Link className={css.margin} to="/profile/own">
            PROFILE
          </Link>

          <Link className={css.margin} to="/add-recipe">
            ADD RECIPE
          </Link>

          <span className={css.margin}>{user.name}</span>

          <button className={css.margin} onClick={handleLogout}>
            LOGOUT
          </button>
        </>
      ) : (
        <>
          <Link className={css.margin} to="/">
            RECIPES
          </Link>

          <Link className={css.margin} to="/auth/login">
            LOGIN
          </Link>

          <Link className={css.margin} to="/auth/register">
            REGISTER
          </Link>
        </>
      )}
    </header>
  );
}
