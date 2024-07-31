import PropTypes from "prop-types";
import styles from "./Heading.module.css";

function Heading({ as = "h1", children, ...props }) {
  const Tag = as;
  const className = `${styles.heading} ${styles[as]}`;

  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}

Heading.propTypes = {
  as: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  children: PropTypes.node.isRequired,
};

export default Heading;
