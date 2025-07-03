import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

export default function RecipesList({ recipes }) {
  return (
    <ul className={css.list}>
      {recipes.map((recipe) => (
        <li key={recipe._id} className={css.item}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
