import { useParams, Navigate } from "react-router";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation.jsx";
import OwnRecipes from "../../components/Profile/OwnRecipes/OwnRecipes.jsx";
import SavedRecipes from "../../components/Profile/SavedRecipes/SavedRecipes";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { recipeType } = useParams();

  let content;
  if (recipeType === "own") {
    content = <OwnRecipes />;
  } else if (recipeType === "favorites") {
    content = <SavedRecipes />;
  } else {
    return <Navigate to='/profile/own' replace />;
  }

  return (
    <section className={`container ${styles.padding}`}>
      <ProfileNavigation />
      {content}
    </section>
  );
}
