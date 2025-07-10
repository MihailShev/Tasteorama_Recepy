import css from "./LogoutModal.module.css";

export default function LogoutModal({ onClose, onLogout }) {
  function Logout() {
    onLogout();
    onClose();
  }
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <h2 className={css.title}>Are you shure?</h2>
        <p className={css.subtitle}>We will miss you!</p>

        <div className={css.buttons}>
          <button className={`${css.button} ${css.logout}`} onClick={Logout}>
            Log out
          </button>
          <button className={`${css.button} ${css.cancel}`} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
