import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "./Select"; // Assuming your Select component is functional and styled

function Dropdown({ options, isAdminVerified, onActionSelect }) {
  const [selectedOption, setSelectedOption] = useState(""); // Track the selected option
  const [isFirstSelection, setIsFirstSelection] = useState(true); // Track if it's the first selection

  // Handle option change
  const handleChange = (e) => {
    const value = e.target.value;

    // Prevent sending the request when "Choose one" is selected
    if (value === "") {
      setSelectedOption(""); // Reset to default "Choose one" option
      return;
    }

    setSelectedOption(value); // Set the selected option
    setIsFirstSelection(false); // Mark that the first selection has been made
    onActionSelect(value); // Send the selected value to the parent component
  };

  // Set default value based on isAdminVerified if needed
  useEffect(() => {
    if (isAdminVerified !== undefined) {
      setSelectedOption(isAdminVerified ? "reject" : "accept");
      setIsFirstSelection(false); // The selection is no longer the first one after this
    }
  }, [isAdminVerified]);

  return (
    <Select
      options={[
        { value: "", label: "یکی را انتخاب کنید", disabled: !isFirstSelection }, // "Choose one" disabled after first selection
        ...options, // The options passed (accept/reject)
      ]}
      value={selectedOption}
      onChange={handleChange}
    />
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
};

export default Dropdown;
