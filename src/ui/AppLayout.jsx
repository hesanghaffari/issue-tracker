import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.AppLayout}>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
      <main className={styles.Main}>
        <div className={styles.Container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
