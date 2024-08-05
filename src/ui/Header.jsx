import HeaderMenu from "./HeaderMenu";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.Header}>
      <HeaderMenu />
    </header>
  );
}

export default Header;
