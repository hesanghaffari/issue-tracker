import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Tabs.module.css";

function Tabs({ tabs, children, resetParams }) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Only reset the page parameter when switching tabs
    if (resetParams && searchParams.get("page")) {
      searchParams.delete("page");
      setSearchParams(searchParams);
    }
  }, [activeTab]); // Only trigger this effect when the activeTab changes

  const handleTabClick = (index) => {
    if (index !== activeTab) {
      setActiveTab(index); // Only change the tab when the user clicks a different tab
    }
  };

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${
              activeTab === index ? styles.active : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContent} key={activeTab}>
        {children[activeTab]}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  resetParams: PropTypes.bool,
};

export default Tabs;
