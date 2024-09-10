import PropTypes from "prop-types";
import styles from "./Form.module.css";

function Form({ type = "regular", children, maxWidth = "450px", ...props }) {
  const className = `${styles.form} ${styles[type]}`;

  return (
    <form className={className} style={{ maxWidth }} {...props}>
      {children}
    </form>
  );
}

Form.propTypes = {
  type: PropTypes.oneOf(["regular", "modal"]),
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
};

export default Form;
