import { useEffect, useState } from "react";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn.jsx";
import RecipesList from "../../RecipesList/RecipesList.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./OwnRecipes.module.css";

const OwnRecipes = () => {
  const [ownRecipes, setOwnRecipes] = useState([]);

  const loadMore = () => {};
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!token) return;
    async function getOwnRecipes() {
      try {
        const response = await axios.get("https://recepy-api.onrender.com/api/recipes/own", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOwnRecipes(response.data);
      } catch (error) {
        error.message;
      }
    }
    getOwnRecipes();
  }, [token]);

  return (
    <div className={styles.bg}>
      <RecipesList recipes={ownRecipes} />
      <LoadMoreBtn load={loadMore} />
    </div>
  );
};

export default OwnRecipes;
