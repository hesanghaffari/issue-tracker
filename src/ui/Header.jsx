import PropTypes from "prop-types";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./Header.module.css";

function Header({ onToggleSidebar }) {
  return (
    <header className={styles.Header}>
      <HamburgerMenu onClick={onToggleSidebar} />
      {/* Add other header contents here */}
    </header>
  );
}

Header.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Header;
