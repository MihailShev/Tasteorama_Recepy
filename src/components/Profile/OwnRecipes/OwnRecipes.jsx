import usePaginatedRecipes from "../usePaginatedRecipes.js";
import RecipesList from "../../RecipesList/RecipesList";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import Loader from "../../Loader/Loader.jsx";

const OwnRecipes = () => {
  const { recipes, loading, hasMore, loadMore, totallItems } = usePaginatedRecipes("recipes/own");

  return (
    <div>
      <RecipesList recipes={recipes} totallItems={totallItems} />
      {loading && <Loader />}
      {hasMore && !loading && <LoadMoreBtn load={loadMore} />}
    </div>
  );
};

export default OwnRecipes;
