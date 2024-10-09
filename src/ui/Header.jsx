import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./Header.module.css";
import Logout from "../feature/authentication/Logout";
import Cookies from "js-cookie";

function Header({ onToggleSidebar }) {
  const [fullname, setFullname] = useState(Cookies.get("fullname") || "");

  // This useEffect will run when the component mounts and when the cookie changes
  useEffect(() => {
    const handleCookieChange = () => {
      // Update the fullname state whenever the cookie changes
      setFullname(Cookies.get("fullname") || "");
    };

    // Monitor for changes in the cookies (optional but useful if cookies change in real time)
    window.addEventListener("cookiechange", handleCookieChange);

    return () => {
      window.removeEventListener("cookiechange", handleCookieChange);
    };
  }, []);

  return (
    <header className={styles.Header}>
      <HamburgerMenu onClick={onToggleSidebar} />
      <Logout />
      {fullname}
    </header>
  );
}

Header.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Header;
