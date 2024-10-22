import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import {
  HiOutlineHome,
  HiOutlineTicket,
  HiOutlineUsers,
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
            to="/dashboardadmin"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            onClick={onClose}
          >
            <HiOutlineHome />
            <span>تیکت ها</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/myticket"
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            onClick={onClose}
          >
            <HiOutlineTicket />
            <span>تیکت‌های من</span>
          </NavLink>
        </li>
        {userRole === "superadmin" && (
          <li>
            <NavLink
              to="/usersList"
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
        <li>
          <NavLink
            to="/momadmin"
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
