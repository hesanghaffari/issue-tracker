import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.Sidebar}>
      <Logo />
    </aside>
  );
}

export default Sidebar;
