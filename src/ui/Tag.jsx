import PropTypes from "prop-types";
import styles from "./Tag.module.css";

const Tag = ({ type, children }) => {
  const tagClass = `${styles.tag} ${styles[type]}`;

  return <span className={tagClass}>{children}</span>;
};

// Define prop types for the Tag component
Tag.propTypes = {
  type: PropTypes.oneOf(["blue", "green", "silver", "yellow"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Tag;
