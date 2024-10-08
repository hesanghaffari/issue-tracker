import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineCog8Tooth,
  HiOutlineDocument,
} from "react-icons/hi2";
import styles from "./MainNav.module.css";

function MainNav({ onClose }) {
  const userRole = Cookies.get("userRole");

  return (
    <nav>
      <ul className={styles.NavList}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            onClick={onClose}
          >
            <HiOutlineHome />
            <span>تیکت‌های من</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/createticket"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            onClick={onClose}
          >
            <HiOutlineTicket />
            <span>ثبت تیکت</span>
          </NavLink>
        </li>
        {userRole === "user" && (
          <li>
            <NavLink
              to="/childList"
              className={({ isActive }) =>
                isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
              }
              onClick={onClose}
            >
              <HiOutlineUsers />
              <span>یوزرها</span>
            </NavLink>
          </li>
        )}
        {/* <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            onClick={onClose}
          >
            <HiOutlineUsers />
            <span>پروفایل</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/profileadmin"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            onClick={onClose}
          >
            <HiOutlineCog8Tooth />
            <span>پروفایل</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/momuser"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            onClick={onClose}
          >
            <HiOutlineDocument /> <span>صورت جلسه</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

MainNav.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MainNav;
