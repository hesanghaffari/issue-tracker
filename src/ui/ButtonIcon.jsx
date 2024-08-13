import PropTypes from "prop-types";
import styles from "./ButtonIcon.module.css";

const ButtonIcon = ({ children, ...props }) => {
  return (
    <button className={styles.buttonIcon} {...props}>
      <span className={styles.icon}>{children}</span>
    </button>
  );
};

ButtonIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonIcon;
