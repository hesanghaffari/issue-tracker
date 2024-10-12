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

    // Only call onActionSelect if a valid option is selected
    if (value) {
      onActionSelect(value); // Send the selected value to the parent component
    }
  };

  // Set default value based on isAdminVerified if needed
  useEffect(() => {
    if (isAdminVerified !== undefined) {
      setSelectedOption(isAdminVerified ? "accept" : "reject"); // Adjust default based on verification status
    }
  }, [isAdminVerified]);
  //   console.log("isLoading in Dropdown:", isLoading);

  return (
    <div>
      {isPending ? (
        <SpinnerMini /> // Show spinner when loading
      ) : (
        <Select
          options={options} // Pass the options directly (accept/reject)
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
