import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineTicket,
} from "react-icons/hi2";
import styles from "./MainNav.module.css";

function MainNav() {
  return (
    <nav>
      <ul className={styles.NavList}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
          >
            <HiOutlineHome />
            <span>تیکت‌های من</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
          >
            <HiOutlineTicket />
            <span>ثبت تیکت</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/cabins"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
          >
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
          >
            <HiOutlineUsers />
            <span>پروفایل</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
          >
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default MainNav;
