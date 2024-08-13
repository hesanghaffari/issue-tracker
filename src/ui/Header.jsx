import PropTypes from "prop-types";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./Header.module.css";
import Logout from "../feature/authentication/Logout";
import Cookies from "js-cookie";

function Header({ onToggleSidebar }) {
  const email = Cookies.get("userEmail");

  return (
    <header className={styles.Header}>
      <HamburgerMenu onClick={onToggleSidebar} />
      {/* Add other header contents here */}
      <Logout />
      {email}
    </header>
  );
}

Header.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Header;
