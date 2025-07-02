import styles from "./RecipeCard.module.css";

export default function RecipeCard({ recipe }) {
  if (!recipe) return null;
  return (
    <div className={styles.div}>
      <img className={styles.img} src={recipe.thumb} alt={recipe.title} />
      <div className={styles.wrap}>
        <h3 className={styles.name}>{recipe.title}</h3>
        <div>
          <p className={styles.time}>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8 3.61537V8.54806L11.2885 11.2884M15.125 8C15.125 11.935 11.935 15.125 8 15.125C4.06497 15.125 0.875 11.935 0.875 8C0.875 4.06497 4.06497 0.875 8 0.875C11.935 0.875 15.125 4.06497 15.125 8Z'
                stroke='black'
                strokeWidth='0.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {recipe.time}
          </p>
        </div>
      </div>
      <p className={styles.desc}>{recipe.description}</p>
      <p className={styles.cl}>{recipe.calories ? `${recipe.calories} cals` : "-"}</p>
      <button className={styles.btn} type='button'>
        Learn More
      </button>
    </div>
  );
}
