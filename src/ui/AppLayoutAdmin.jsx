import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import Header from "./Header";
import styles from "./AppLayout.module.css";

function AppLayoutAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.AppLayout}>
      <Header onToggleSidebar={handleToggleSidebar} />
      <SidebarAdmin isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
      <main className={styles.Main}>
        <div className={styles.Container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayoutAdmin;
