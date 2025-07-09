import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../redux/auth/operations.js";

export default function Bootstrap({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refresh());
    }
  }, []);

  return children;
}
