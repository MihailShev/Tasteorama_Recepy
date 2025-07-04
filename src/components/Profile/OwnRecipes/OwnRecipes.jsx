import usePaginatedRecipes from "../usePaginatedRecipes.js";
import RecipesList from "../../RecipesList/RecipesList";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import styles from "./OwnRecipes.module.css";

const OwnRecipes = () => {
  const { recipes, loading, hasMore, loadMore } = usePaginatedRecipes("recipes/own");

  return (
    <div className={styles.bg}>
      <RecipesList recipes={recipes} />
      {hasMore && !loading && <LoadMoreBtn load={loadMore} />}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default OwnRecipes;
