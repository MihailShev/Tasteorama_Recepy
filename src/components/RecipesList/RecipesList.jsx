import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import styles from "./RecipesList.module.css";

export default function RecipesList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return <p className={styles.noRecipes}>No recipes available.</p>;
  }

  return (
    <>
      <p className={styles.total}>
        {recipes.totalItems} {recipes.totalItems === 1 ? "recipe" : "recipes"}
      </p>
      <ul className={styles.list}>
        {recipes.data.map(card => (
          <li key={card._id} className={styles.li}>
            <RecipeCard recipe={card} />
          </li>
        ))}
      </ul>
    </>
  );
}
