import PropTypes from "prop-types";
import styles from "./Tag.module.css";

const Tag = ({ type, children }) => {
  const tagClass = `${styles.tag} ${styles[type]}`;

  return <span className={tagClass}>{children}</span>;
};

Tag.propTypes = {
  type: PropTypes.oneOf(["blue", "green", "silver", "yellow", "purple"])
    .isRequired,
  children: PropTypes.node.isRequired,
};

export default Tag;
