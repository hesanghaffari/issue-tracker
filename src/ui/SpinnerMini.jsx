import styles from "./Spinner.module.css";
import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini() {
  return (
    <div className={styles.SpinnerMini}>
      <BiLoaderAlt />
    </div>
  );
}

export default SpinnerMini;
