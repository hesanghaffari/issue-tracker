import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = forwardRef(({ showtoggle, onToggle, type, ...props }, ref) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        ref={ref}
        type={type}
        className={
          showtoggle ? `${styles.input} ${styles.withToggleIcon}` : styles.input
        }
        {...props}
      />
      {showtoggle && (
        <span onClick={onToggle} className={styles.toggleIcon}>
          {type === "password" ? "👁️" : "🙈"}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  showtoggle: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default Input;
