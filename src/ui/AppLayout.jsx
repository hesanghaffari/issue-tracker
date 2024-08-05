import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.AppLayout}>
      <Header />
      <Sidebar />
      <main className={styles.Main}>
        <div className={styles.Container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
