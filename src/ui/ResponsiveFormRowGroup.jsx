import PropTypes from "prop-types";
import styles from "./ResponsiveFormRowGroup.module.css";

function ResponsiveFormRowGroup({ children }) {
  return <div className={styles.group}>{children}</div>;
}

ResponsiveFormRowGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResponsiveFormRowGroup;
