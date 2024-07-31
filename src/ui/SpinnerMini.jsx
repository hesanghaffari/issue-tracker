import { BiLoaderAlt } from "react-icons/bi";
import styles from "./SpinnerMini.module.css";

function SpinnerMini(props) {
  return <BiLoaderAlt className={styles.spinner} {...props} />;
}

export default SpinnerMini;
