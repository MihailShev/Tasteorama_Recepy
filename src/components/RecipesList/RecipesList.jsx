import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

export default function RecipesList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return <p className={css.noRecipes}>No recipes available.</p>;
  }
  return (
    <>
      {recipes.totalItems > 0 && (
        <p className={css.total}>
          {recipes.totalItems} {recipes.totalItems === 1 ? "recipe" : "recipes"}
        </p>
      )}
      <ul className={css.list}>
        {recipes.map(recipe => (
          <li key={recipe._id} className={css.item}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </>
  );
}
