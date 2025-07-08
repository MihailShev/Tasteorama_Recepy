import usePaginatedRecipes from "../usePaginatedRecipes.js";
import RecipesList from "../../RecipesList/RecipesList";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import Loader from "../../Loader/Loader.jsx";

const SavedRecipes = () => {
  const { recipes, loading, hasMore, loadMore, totallItems } = usePaginatedRecipes("recipes/favorites");

  return (
    <div>
      <RecipesList recipes={recipes} totallItems={totallItems} />
      {loading && <Loader />}
      {hasMore && !loading && <LoadMoreBtn onLoad={loadMore} />}
    </div>
  );
};

export default SavedRecipes;
