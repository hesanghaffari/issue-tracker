import PropTypes from "prop-types";
import styles from "./TableOperations.module.css";

function TableOperations({ children }) {
  return <div className={styles.tableOperations}>{children}</div>;
}

TableOperations.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableOperations;
