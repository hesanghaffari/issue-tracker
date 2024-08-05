import Logo from "./Logo";
import MainNav from "./MainNav";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.Sidebar}>
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
