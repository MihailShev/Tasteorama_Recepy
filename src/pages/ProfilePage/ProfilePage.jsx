import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import RecipesList from "../../components/RecipesList/RecipesList.jsx";

export default function ProfilePage() {
  return (
    <>
      <ProfileNavigation />

      <RecipesList />

      <RecipeCard />

      <LoadMoreBtn />
    </>
  );
}
