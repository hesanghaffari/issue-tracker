import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css"; // Assuming you have a CSS module for Input

const Input = forwardRef((props, ref) => {
  return <input ref={ref} className={styles.input} {...props} />;
});

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
