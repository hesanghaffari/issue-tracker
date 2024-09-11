import PropTypes from "prop-types";
import Logo from "./Logo";
import MainNav from "./MainNav";
import styles from "./Sidebar.module.css";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import Footer from "./Footer";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className={styles.Overlay} onClick={onClose}></div>}
      <aside className={`${styles.Sidebar} ${isOpen ? styles.open : ""}`}>
        <Logo />

        <MainNav onClose={onClose} />
        <button onClick={onClose} className={styles.CloseButton}>
          <HiMiniArrowLongRight />
        </button>
        <Footer />
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
