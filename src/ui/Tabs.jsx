import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Tabs.module.css";

function Tabs({ tabs, children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${
              activeTab === index ? styles.active : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{children[activeTab]}</div>
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Tabs;
