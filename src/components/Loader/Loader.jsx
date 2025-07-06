import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <ClipLoader color='#36d7b7' size={50} />
    </div>
  );
};

export default Loader;
