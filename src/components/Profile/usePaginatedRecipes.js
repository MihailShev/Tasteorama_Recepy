import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const usePaginatedRecipes = endpoint => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totallItems, setTotalItems] = useState(null);
  const token = useSelector(state => state.auth.token);

  const fetchRecipes = async currentPage => {
    try {
      setLoading(true);
      const response = await axios.get(`https://recepy-api.onrender.com/api/${endpoint}?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apiData = response.data.data;
      const newRecipes = apiData.data;
      const next = apiData.hasNextPage;
      const totalItems = apiData.totalItems;

      if (currentPage === 1) {
        setRecipes(newRecipes);
      } else {
        setRecipes(prev => [...prev, ...newRecipes]);
      }

      setHasMore(next);
      setTotalItems(totalItems);
    } catch (error) {
      error.message;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchRecipes(1);
  }, [token, endpoint]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRecipes(nextPage);
  };

  return { recipes, loading, hasMore, loadMore, totallItems };
};

export default usePaginatedRecipes;
