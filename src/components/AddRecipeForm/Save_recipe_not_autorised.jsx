import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./Save_recipe_not_autorised.module.css";


export default function AuthModal({ onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/img/svg/icons.svg#icon-arr-prew" />
          </svg>
        </button>
        <h2 className={css.title}>Error while saving</h2>
        <p className={css.text}>
          To save this recipe, you need to authorize first
        </p>
        <div className={css.actions}>
          <button className={css.loginBtn} onClick={() => navigate("/auth/login")}>
            Log in
          </button>
          <button className={css.registerBtn} onClick={() => navigate("/auth/register")}>
            Register
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
