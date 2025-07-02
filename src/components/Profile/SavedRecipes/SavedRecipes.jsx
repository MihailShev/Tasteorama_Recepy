import { useEffect, useState } from "react";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import RecipesList from "../../RecipesList/RecipesList.jsx";

const SavedRecipes = () => {
  const loadMore = () => {};

  const [recipes, setRecipes] = useState([]);

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!token) return;
    async function getOwnRecipes() {
      try {
        const response = await axios.get("https://recepy-api.onrender.com/api/recipes");
        setRecipes(response.data.data);
      } catch (error) {
        error.message;
      }
    }
    getOwnRecipes();
  }, [token]);

  return (
    <div>
      <RecipesList recipes={recipes} />
      <LoadMoreBtn load={loadMore} />
    </div>
  );
};

export default SavedRecipes;
