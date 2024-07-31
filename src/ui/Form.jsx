import PropTypes from "prop-types";
import styles from "./Form.module.css";

function Form({ type = "regular", children, ...props }) {
  // Construct className based on the type prop
  const className = `${styles.form} ${styles[type]}`;

  return (
    <form className={className} {...props}>
      {children}
    </form>
  );
}

Form.propTypes = {
  type: PropTypes.oneOf(["regular", "modal"]),
  children: PropTypes.node.isRequired,
};

export default Form;
