import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../redux/index.js";
import { refresh } from "../../redux/auth/operations.js";

export default function Bootstrap({ children }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch(refresh());
    }
  }, [token, dispatch]);

  return children;
}
