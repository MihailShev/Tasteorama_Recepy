import axios from 'axios';
import { useState, useMemo } from 'react';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm.jsx';
import { Navigate } from 'react-router';

export default function AddRecipePage() {
  const [isError, setIsError] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);

  useMemo(() => {
    try {
      setIsError(false);
      axios
        .get('https://recepy-api.onrender.com/api/categories/all')
        .then(info => setCategoryList(info.data.data));
      axios
        .get('https://recepy-api.onrender.com/api/ingredients')
        .then(info => setIngredientList(info.data.data));
    } catch {
      setIsError(true);
    }
  }, []);

  if (!isError) {
    return (
      <>
        <AddRecipeForm categories={categoryList} ingredients={ingredientList} />
      </>
    );
  } else {
    return <Navigate to="/recipes" replace />;
  }
}
