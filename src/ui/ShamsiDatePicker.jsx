import { useState } from "react";
import { Datepicker } from "@ijavad805/react-datepicker";
import PropTypes from "prop-types";

function ShamsiDatePicker({ label, paramName, onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (jalaliDate) => {
    const gregorianDate = jalaliDate.format("YYYY-MM-DD"); // Convert to Gregorian
    setSelectedDate(jalaliDate);
    onDateChange(paramName, gregorianDate); // Send the Gregorian date back to the parent component
  };

  return (
    <div>
      <label>{label}</label>
      <Datepicker
        format={"jYYYY/jMM/jDD"} // Display format in Jalali
        onChange={handleDateChange}
        lang={"fa"}
        defaultValue={selectedDate}
        input={<input placeholder="Select a date" />}
      />
    </div>
  );
}
ShamsiDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  paramName: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};
export default ShamsiDatePicker;
