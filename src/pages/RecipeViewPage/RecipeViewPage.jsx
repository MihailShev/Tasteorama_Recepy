import { useEffect, useState } from "react";
import NotFound from "../../components/NotFound/NotFound.jsx";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails.jsx";
import { fetchIngridients, fetchRecipeById } from "../../request/request.js";
import { useParams } from "react-router";

export default function RecipeViewPage() {
  // const recipeId = "6462a8f74c3d0ddd28897fcd";
  const [error, SetError] = useState(false);
  const [recipe, SetRecipe] = useState(null);
  // const [ingredients, SetIngredients] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getRecipe() {
      try {
        SetIsLoading(true);
        SetError(false);
        SetRecipe(null);
        const item = await fetchRecipeById(id);
        // const ingredientsList = await fetchIngridients();

        SetRecipe(item.data);
        // SetIngredients(ingredientsList.data);
      } catch (error) {
        SetError(true);
      } finally {
        SetIsLoading(false);
      }
    }

    getRecipe();
  }, [id, SetRecipe]);
  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <NotFound>
          <p>Something went wrong</p>
        </NotFound>
      ) : !recipe ? (
        <NotFound>
          <p>Recipe not found</p>
        </NotFound>
      ) : (
        <RecipeDetails
          recipe={recipe}
          // ingredientsList={ingredients}
        />
      )}
    </div>
  );
}
