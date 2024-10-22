import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./Header.module.css";
import Logout from "../feature/authentication/Logout";
import Cookies from "js-cookie";

function Header({ onToggleSidebar }) {
  const [fullname, setFullname] = useState(Cookies.get("fullname") || "");

  useEffect(() => {
    const handleCookieChange = () => {
      setFullname(Cookies.get("fullname") || "");
    };

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
