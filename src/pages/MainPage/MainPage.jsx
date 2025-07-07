import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchRecipes } from "../../redux/recipes/operations";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations.js";
import {
  selectItems,
  selectRecipesError,
  selectRecipesLoading,
} from "../../redux/recipes/selectors";
import {
  selectCategories,
  selectFiltersError,
  selectFiltersLoading,
  selectIngredients,
  selectSelectedCategory,
  selectSelectedIngredient,
  selectSelectedQuery,
} from "../../redux/filters/selectors.js";
import "../../index.css";

import RecipesList from "../../components/RecipesList/RecipesList.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import {
  setSelectedCategory,
  setSelectedIngredient,
  setSelectedQuery,
} from "../../redux/filters/slice.js";
import Filters from "../../components/Filters/Filters.jsx";

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const recipes = useSelector(selectItems);
  const recipesIsLoading = useSelector(selectRecipesLoading);
  const recipesIsError = useSelector(selectRecipesError);
  const ingredient = useSelector(selectSelectedIngredient);
  const category = useSelector(selectSelectedCategory);
  const title = useSelector(selectSelectedQuery);

  const filtersIngredients = useSelector(selectIngredients);
  const filtersCategories = useSelector(selectCategories);

  const didInit = useRef(false);

  useEffect(() => {
    const categoryParam = searchParams.get("category") || "";
    const ingredientParam = searchParams.get("ingredient") || "";
    const queryParam = searchParams.get("title") || "";

    dispatch(setSelectedCategory(categoryParam));
    dispatch(setSelectedIngredient(ingredientParam));
    dispatch(setSelectedQuery(queryParam));

    dispatch(
      fetchRecipes({
        category: categoryParam,
        ingredient: ingredientParam,
        title: queryParam,
      })
    );

    dispatch(fetchCategories());
    dispatch(fetchIngredients());
    setTimeout(() => {
      didInit.current = true;
    }, 0);
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (!didInit.current) return;
    const params = {};
    if (category) params.category = category;
    if (ingredient) params.ingredient = ingredient;
    if (title) params.title = title;

    setSearchParams(params);
  }, [category, ingredient, title, setSearchParams]);
  return (
    <>
      <SearchBox />
      <div className="container">
        <Filters
          categories={filtersCategories}
          ingredients={filtersIngredients}
        />

        {recipesIsLoading ? (
          <p>Loading...</p>
        ) : (
          <RecipesList recipes={recipes} />
        )}

        <LoadMoreBtn />
      </div>
    </>
  );
}
