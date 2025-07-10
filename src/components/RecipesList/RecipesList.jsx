import { useSelector } from "react-redux";
import { selectRecipesLoading } from "../../redux/recipes/selectors";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";
import Loader2 from "../Loader/Loader2";

export default function RecipesList({ recipes, totallItems }) {
  // if (!recipes || recipes.length === 0) {
  //   return <p className={css.noRecipes}>No recipes available.</p>;
  // }
  const recipesIsLoading = useSelector(selectRecipesLoading);

  return (
    <>
      {recipesIsLoading && <Loader2 />}
      {totallItems > 0 && (
        <p className={css.total}>
          {totallItems} {totallItems === 1 ? "recipe" : "recipes"}
        </p>
      )}
      <ul className={css.list}>
        {recipes.map((recipe) => (
          <li key={recipe._id} className={css.item}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </>
  );
}
