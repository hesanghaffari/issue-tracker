import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({
  size = "medium",
  variation = "primary",
  children,
  ...props
}) {
  // Construct className based on size and variation props
  const className = `${styles.button} ${styles[size]} ${styles[variation]}`;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variation: PropTypes.oneOf(["primary", "secondary", "danger"]),
  children: PropTypes.node.isRequired,
};

export default Button;
