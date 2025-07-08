import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import css from "./RecipeCard.module.css";
import { addFavorite, removeFavorite } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import clsx from "clsx";
import SaveRecipeNotAuthorized from "../AddRecipeForm/Save_recipe_not_autorised";
import {
  selectIsLoggedIn,
  selectToken,
  selectUser,
} from "../../redux/auth/selectors";

export default function RecipeCard({ recipe }) {

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const isFavorite =
    Array.isArray(user?.favorites) &&
    recipe?._id &&
    user.favorites.includes(String(recipe._id));

  const navigate = useNavigate();
  if (!recipe) return null;

  const handleRedirect = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleOpenSaveModal = () => {
    setShowSaveModal(true); 
  };


  async function onAdd(recipe) {
  try {
    SetIsLoading(true);
    const resultAction = await dispatch(addFavorite({ recipeId: recipe._id, token }));

    if (addFavorite.fulfilled.match(resultAction)) {
      toast.success("Recipe successfully added to favorites");
    } else {
      if (resultAction.payload?.status === 409) {
        toast.error("Recipe has already been added");
      } else {
        toast.error("Failed to add recipes to favorites");
      }
    }
  } finally {
    SetIsLoading(false);
  }
}

  async function onDelete(recipe) {
    try {
      SetIsLoading(true);
      const resultAction = await dispatch(removeFavorite({ recipeId: recipe._id, token }));
      
      if (removeFavorite.fulfilled.match(resultAction)) {
        toast.success("Recipe successfully removed from favorites");
      } else {
        if (resultAction.payload?.status === 409) {
          toast.error("Recipe has already been deleted");
        } else {
          toast.error("Failed to remove recipes from favorites");
        }
      }
    } finally {
      SetIsLoading(false);
    }
  }



  return (
    <div className={css.card}>
      <img src={recipe.thumb} alt={recipe.title} className={css.image} />
      <div className={css.content}>
        <div className={css.titleSection}>
          <h3 className={css.title}>{recipe.title}</h3>
          <div className={css.time}>
            <svg className={css.clockIcon} aria-label="icon">
              <use href="/img/svg/icons.svg#icon-clock" />
            </svg>
            <p className={css.timeDesc}>{recipe.time}</p>
          </div>
        </div>
        <div className={css.descSection}>
          <p className={css.desc}>{recipe.description}</p>
          <p className={css.calories}>~ calories</p> {/*заглушка*/}
        </div>
        <div className={css.actions}>
          <button className={css.learnMore} onClick={() => handleRedirect()}>
            Learn more
          </button>

          {isLoggedIn ? (
            isFavorite ? (
              <button
                onClick={() => onDelete(recipe)}
                className={clsx(css.favBtn, css.remove, {
                  [css.loading]: isLoading,
                })}
              >
                <svg className={css.saveIcon}>
                  <use
                    href="/img/svg/icons.svg#icon-save"
                  ></use>
                </svg>
              </button>
            ) : (
              <button
                onClick={() => onAdd(recipe)}
                className={clsx(css.favBtn, { [css.loading]: isLoading })}
              >
                <svg className={css.saveIcon}>
                  <use href="/img/svg/icons.svg#icon-save" />
                </svg>
              </button>
            )
          ) : (
            <button
              onClick={handleOpenSaveModal}
              className={clsx(css.favBtn, { [css.loading]: isLoading })}
            >
            <svg className={css.saveIcon} aria-label="icon">
              <use href="/img/svg/icons.svg#icon-save" />
            </svg>
            </button>
          )}
        </div>
      </div>
    {showSaveModal && (
      <SaveRecipeNotAuthorized onClose={() => setShowSaveModal(false)} />
    )}
    </div>
    
  );
}
