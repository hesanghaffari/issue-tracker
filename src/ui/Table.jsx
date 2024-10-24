import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import styles from "./Table.module.css";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className={styles.styledTableContainer}>
        <div className={styles.styledTable} role="table">
          {children}
        </div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`${styles.commonRow} ${styles.styledHeader}`}
      role="row"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`${styles.commonRow} ${styles.styledRow}`}
      role="row"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  const items =
    data.tickets || data.admins || data.users || data.children || data.moms;
  if (!items.length) return <p className={styles.empty}>موجود نیست</p>;

  return <section className={styles.styledBody}>{items.map(render)}</section>;
}

function Footer({ children }) {
  return <footer className={styles.footer}>{children}</footer>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

Table.propTypes = {
  columns: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

Body.propTypes = {
  data: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

Footer.propTypes = {
  children: PropTypes.node,
};

export default Table;
