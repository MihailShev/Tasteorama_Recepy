import usePaginatedRecipes from "../usePaginatedRecipes.js";
import RecipesList from "../../RecipesList/RecipesList";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";

const SavedRecipes = () => {
  const { recipes, loading, hasMore, loadMore } = usePaginatedRecipes("recipes/favorites");

  return (
    <div>
      <RecipesList recipes={recipes} />
      {hasMore && !loading && <LoadMoreBtn load={loadMore} />}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SavedRecipes;
