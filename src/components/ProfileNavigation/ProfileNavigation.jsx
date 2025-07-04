import { NavLink } from "react-router";
import clsx from "clsx";
import styles from "./ProfileNavigation.module.css";

const getLinkStyles = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

export default function ProfileNavigation() {
  return (
    <>
      <nav>
        <h2 className={styles.title}>My profile</h2>
        <ul className={styles.list}>
          <li>
            <NavLink to={"/profile/own"} className={getLinkStyles}>
              My Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to={"/profile/favorites"} className={getLinkStyles}>
              Saved Recipes
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
