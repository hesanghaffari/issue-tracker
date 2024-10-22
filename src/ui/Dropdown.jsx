import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "./Select";
import SpinnerMini from "./SpinnerMini";

function Dropdown({ options, isAdminVerified, onActionSelect, isPending }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value && value !== "unverified") {
      onActionSelect(value);
    }
  };

  useEffect(() => {
    if (isAdminVerified === null) {
      setSelectedOption("unverified");
    } else {
      setSelectedOption(isAdminVerified ? "accept" : "reject");
    }
  }, [isAdminVerified]);

  return (
    <div>
      {isPending ? (
        <SpinnerMini />
      ) : (
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  isAdminVerified: PropTypes.bool,
  onActionSelect: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};

export default Dropdown;
