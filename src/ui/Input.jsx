import PropTypes from "prop-types";
import styles from "./Input.module.css";

function Input(props) {
  return <input className={styles.input} {...props} />;
}

Input.propTypes = {
  // Define prop types if necessary, for example:
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  // ... add other prop types as needed
};

export default Input;
