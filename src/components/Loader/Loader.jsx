import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Loader.module.css";

const Loader = ({ color = "#3a2016", size = 50, className = styles.spinnerWrapper }) => {
  return (
    <div className={className}>
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default Loader;
