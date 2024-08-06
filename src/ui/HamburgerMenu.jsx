import PropTypes from "prop-types";
import styles from "./HamburgerMenu.module.css";

function HamburgerMenu({ onClick }) {
  return (
    <button
      className={styles.HamburgerMenu}
      onClick={onClick}
      aria-label="Toggle Menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

HamburgerMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HamburgerMenu;
