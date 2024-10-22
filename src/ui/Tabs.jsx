import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Tabs.module.css";

function Tabs({ tabs, children, resetParams }) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [shouldResetParams, setShouldResetParams] = useState(false);

  const resetPageParams = useCallback(() => {
    if (resetParams && searchParams.get("page")) {
      searchParams.delete("page");
      setSearchParams(searchParams);
    }
  }, [resetParams, searchParams, setSearchParams]);

  useEffect(() => {
    if (shouldResetParams) {
      resetPageParams();
      setShouldResetParams(false);
    }
  }, [activeTab, shouldResetParams, resetPageParams]);

  const handleTabClick = (index) => {
    if (index !== activeTab) {
      setActiveTab(index);
      setShouldResetParams(true);
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
