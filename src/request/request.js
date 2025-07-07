import { api } from "../redux";

export const fetchRecipeById = async (recipeId) => {
  const response = await api.get(`/api/recipes/${recipeId}`);
  return response.data;
};
export const fetchIngridients = async () => {
  const response = await api.get(`/api/ingredients/`);
  console.log(response);
  return response.data;
};
