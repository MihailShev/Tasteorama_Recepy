import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../redux";
import { setCredentials } from "../../redux/auth/slice.js";
import { refresh } from "../../redux/auth/operations.js";

export default function Bootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      dispatch(
        setCredentials({
          token: token,
          user: JSON.parse(user),
        })
      );

      dispatch(refresh());
    }
  }, []);

  return children;
}
