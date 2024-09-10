import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({
  size = "medium",
  variation = "primary",
  className = "",
  children,
  ...props
}) {
  // Construct className by merging Button.module.css classes with any passed className
  const buttonClassName = `${styles.button} ${styles[size]} ${styles[variation]} ${className}`;

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variation: PropTypes.oneOf(["primary", "secondary", "danger"]),
  className: PropTypes.string, // Allow passing custom classes
  children: PropTypes.node.isRequired,
};

export default Button;
