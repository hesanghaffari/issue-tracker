import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineTicket,
} from "react-icons/hi2";
import styles from "./MainNav.module.css";

function MainNav({ onClose }) {
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
        {/* <li>
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
        </li> */}
        <li>
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
        </li>
      </ul>
    </nav>
  );
}

MainNav.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MainNav;
