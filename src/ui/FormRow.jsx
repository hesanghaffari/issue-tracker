import React from "react";
import PropTypes from "prop-types";
import styles from "./FormRow.module.css";

function FormRow({
  label,
  error,
  children,
  isFirstChild,
  isLastChild,
  className,
}) {
  const hasButton = React.Children.toArray(children).some(
    (child) => child.type === "button"
  );

  return (
    <div
      className={`${styles.formRow} 
      ${hasButton ? styles.hasButton : ""} 
      ${isFirstChild ? styles.firstChild : ""} 
      ${isLastChild ? styles.lastChild : styles.notLastChild} 
      ${className}`}
    >
      {label && (
        <label className={styles.label} htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
  isFirstChild: PropTypes.bool,
  isLastChild: PropTypes.bool,
  className: PropTypes.string, // Add className prop to propTypes
};

export default FormRow;
