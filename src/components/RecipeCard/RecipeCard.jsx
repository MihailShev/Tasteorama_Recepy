import { useNavigate } from "react-router";
import css from "./RecipeCard.module.css";

function TextSplitter({ text, maxChars = 100, className }) {
  const displayText =
    text.length > maxChars ? text.slice(0, maxChars) + "…" : text;

  return <p className={className}>{displayText}</p>;
}

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  if (!recipe) return null;

  const handleRedirect = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  return (
    <div className={css.card}>
      <img src={recipe.thumb} alt={recipe.title} className={css.image} />
      <div className={css.content}>
        <div className={css.titleSection}>
          <h3 className={css.title}>{recipe.title}</h3>
          <div className={css.time}>
            {/* заглушка иконки */}
            {/* <img className={css.timeIcon}></img> */}
            <svg className={css.clockIcon} aria-label="icon">
              <use xlinkHref="/public/img/svg/icons.svg#icon-clock" />
            </svg>
            <p className={css.timeDesc}>{recipe.time}</p>
          </div>
        </div>
        <div className={css.descSection}>
          <p className={css.desc}>{recipe.description}</p>
          {/* <TextSplitter className = {css.desc} text={recipe.description} maxChars={100} /> */}
          <p className={css.calories}>~ calories</p> {/*заглушка*/}
        </div>
        <div className={css.actions}>
          <button className={css.learnMore} onClick={() => handleRedirect()}>
            Learn more
          </button>
          <button className={css.favBtn}>
            <svg className={css.saveIcon} aria-label="icon">
              <use xlinkHref="/public/img/svg/icons.svg#icon-save" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
