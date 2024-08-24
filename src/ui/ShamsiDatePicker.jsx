import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useSearchParams } from "react-router-dom";
import moment from "moment-jalaali";
import PropTypes from "prop-types";

export default function ShamsiDatePicker({ paramName }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null); // Control the selected date

  const handleDateChange = (date) => {
    if (date) {
      // Convert selected date to Gregorian date
      const gregorianDate = moment(date.toDate()).format("YYYY-MM-DD");
      searchParams.set(paramName, gregorianDate);
    } else {
      searchParams.delete(paramName);
    }
    setSelectedDate(date); // Update the state with the selected date
    setSearchParams(searchParams);
  };

  ShamsiDatePicker.propTypes = {
    paramName: PropTypes.string.isRequired,
  };

  return (
    <div style={{ direction: "rtl" }}>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={selectedDate} // Use the controlled state
        onChange={handleDateChange}
        render={
          <CustomInput value={selectedDate ? selectedDate.format() : ""} />
        } // Pass the value properly
      />
    </div>
  );
}

function CustomInput({ openCalendar, value }) {
  return (
    <input
      onFocus={openCalendar} // Open the calendar on focus
      value={value || ""} // Display the selected date or an empty string
      readOnly
    />
  );
}

CustomInput.propTypes = {
  value: PropTypes.string,
  openCalendar: PropTypes.func.isRequired,
};
