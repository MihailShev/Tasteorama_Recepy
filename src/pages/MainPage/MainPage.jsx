import Filters from "../../components/Filters/Filters.jsx";
import RecipesList from "../../components/RecipesList/RecipesList.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

export default function MainPage() {
  return (
    <>
      <SearchBox />

      <Filters />

      <RecipesList />

      <RecipeCard />

      <LoadMoreBtn />
    </>
  );
}
