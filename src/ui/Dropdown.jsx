import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "./Select"; // Assuming your Select component is functional and styled
import SpinnerMini from "./SpinnerMini"; // Import your spinner component

function Dropdown({ options, isAdminVerified, onActionSelect, isPending }) {
  const [selectedOption, setSelectedOption] = useState(""); // Track the selected option

  // Handle option change
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value); // Set the selected option

    // Only call onActionSelect if a valid option is selected and it is not "تایید نشده"
    if (value && value !== "unverified") {
      onActionSelect(value); // Send the selected value to the parent component
    }
  };

  // Set default value based on isAdminVerified if needed
  useEffect(() => {
    if (isAdminVerified === null) {
      setSelectedOption("unverified"); // Default to "تایید نشده" if isAdminVerified is null
    } else {
      setSelectedOption(isAdminVerified ? "accept" : "reject"); // Adjust default based on verification status
    }
  }, [isAdminVerified]);

  return (
    <div>
      {isPending ? (
        <SpinnerMini /> // Show spinner when loading
      ) : (
        <Select
          options={options} // Pass the options directly (accept/reject/unverified)
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
      value: PropTypes.string.isRequired, // Value to be sent in onActionSelect
      label: PropTypes.string.isRequired, // Label for display
    })
  ).isRequired,
  isAdminVerified: PropTypes.bool, // Boolean to detect user verification status
  onActionSelect: PropTypes.func.isRequired, // Callback to handle selection
  isPending: PropTypes.bool, // Prop to indicate loading state
};

export default Dropdown;
