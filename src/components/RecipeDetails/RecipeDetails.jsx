import { useEffect, useState } from "react";
import style from "./RecipeDetails.module.css";
import {
  selectIsLoggedIn,
  selectToken,
  selectUser,
} from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import clsx from "clsx";
import SaveRecipeNotAuthorized from "../AddRecipeForm/Save_recipe_not_autorised";

export default function RecipeDetails({
  recipe,
  // ingredientsList
}) {
  const [instructions, SetInstructions] = useState(null);
  const [isLoading, SetIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false); // ← Добавлено

  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  function transformImageUrl(url) {
    const baseUrl = "https://ftp.goit.study/img/so-yummy/preview/";
    if (url.startsWith(baseUrl)) {
      const rest = url.slice(baseUrl.length);
      return `${baseUrl}large/${rest}`;
    }
    return url;
  }

  const isFavorite =
    Array.isArray(user?.favorites) &&
    recipe?._id &&
    user.favorites.includes(String(recipe._id));

  // const handleOpenSaveModal = () => {
  //   setShowSaveModal(true); // ← Показываем модалку
  // };

  async function onAdd(recipe) {
    try {
      SetIsLoading(true);
      await dispatch(addFavorite({ recipeId: recipe._id, token })).unwrap();
      toast.success("Recipe successfully added to favorites");
    } catch (error) {
      if (error?.status === 409) {
        toast.error("Recipe has already been added");
      } else {
        toast.error("Failed to add recipes to favorites");
      }
    } finally {
      SetIsLoading(false);
    }
  }

  async function onDelete(recipe) {
    try {
      SetIsLoading(true);
      await dispatch(removeFavorite({ recipeId: recipe._id, token })).unwrap();
      toast.success("Recipe successfully removed from favorites");
    } catch (error) {
      if (error?.status === 409) {
        toast.error("Recipe has already been deleted");
      } else {
        toast.error("Failed to remove recipes from favorites");
      }
    } finally {
      SetIsLoading(false);
    }
  }

  useEffect(() => {
    if (recipe?.instructions) {
      const formattedInstructions = recipe.instructions
        .split("\r\n")
        .map((line, index) => (
          <span className={style.gap} key={index}>
            {line}
            <br />
          </span>
        ));
      SetInstructions(formattedInstructions);
    }
  }, [recipe, user]);
  // const mergedIngredients = recipe?.ingredients.map((item) => {
  //   const fullIngredient = ingredientsList.find(
  //     (ingredient) => ingredient._id === item.ingredient
  //   );
  //   return (
  //     <li key={item._id} className={style.ingredient}>
  //       {fullIngredient && fullIngredient.name} — {item.measure}
  //     </li>
  //   );
  // });
  return (
    <>
      {recipe && (
        <div className={style.wrap}>
          <div className={style.hero}>
            <div className={style.img}>
              {recipe.thumb && (
                <img
                  src={transformImageUrl(recipe.thumb)}
                  alt={recipe.title}
                  width={1226}
                  height={624}
                />
              )}
            </div>
            <h1 className={style.title}>{recipe.title}</h1>
          </div>
          <div className={style.nohero}>
            <div className={style.info}>
              <div className={style.general}>
                <h2 className={style.subtitle}>General information</h2>
                <ul className={style.desc}>
                  <li className={style.item}>
                    Category:{" "}
                    <span className={style.span}>{recipe.category}</span>
                  </li>
                  <li className={style.item}>
                    Cooking time:{" "}
                    <span className={style.span}>{recipe.time} minutes</span>
                  </li>
                  <li className={style.item}>
                    Caloric content:{" "}
                    <span className={style.span}>
                      {" "}
                      ~ {recipe.cals && recipe.cals} cals
                    </span>
                  </li>
                </ul>
              </div>
              {
                isLoggedIn &&
                  (isFavorite ? (
                    <button
                      onClick={() => onDelete(recipe)}
                      className={clsx(style.btn, style.remove, {
                        [style.loading]: isLoading,
                      })}
                    >
                      Remove{" "}
                      <svg className={style.save} width="24" height="24">
                        <use
                          className={style.svg}
                          href="/img/svg/icons.svg#icon-delete"
                        ></use>
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => onAdd(recipe)}
                      className={clsx(style.btn, {
                        [style.loading]: isLoading,
                      })}
                    >
                      Save{" "}
                      <svg className={style.save} width="24" height="24">
                        <use
                          className={style.svg}
                          href="/img/svg/icons.svg#icon-save"
                        ></use>
                      </svg>
                    </button>
                  ))
                // ) : (
                //   <button
                //     onClick={handleOpenSaveModal} // ← Показываем модалку
                //     className={clsx(style.btn, { [style.loading]: isLoading })}
                //   >
                //     Save
                //   </button>
                // )
              }
            </div>

            <div className={style.about}>
              <div className={style.box}>
                <h2 className={style.subtitle}>About recipe</h2>
                <p className={style.text}>{recipe.description}</p>
              </div>
              <div className={style.box}>
                <h2 className={style.subtitle}>Ingredients:</h2>
                <ul className={`${style.text} ${style.ingredients}`}>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.name} className={style.ingredient}>
                      {ingredient.name} — {ingredient.measure}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${style.prep} ${style.box}`}>
                <h2 className={style.subtitle}>Preparation Steps:</h2>
                <p className={style.text}>{instructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {showSaveModal && (
        <SaveRecipeNotAuthorized onClose={() => setShowSaveModal(false)} />
      )} */}
    </>
  );
}
