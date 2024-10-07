import { useState, forwardRef } from "react";
import DatePicker from "react-multi-date-picker";
import opacity from "react-element-popper/animations/opacity";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import PropTypes from "prop-types";
import Input from "./Input";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const DatePickerMom = forwardRef(({ onDateChange }, ref) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Pass the selected date to AddMomForm
  };

  return (
    <DatePicker
      weekDays={weekDays}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      value={selectedDate}
      onChange={handleDateChange}
      animations={[opacity()]}
      render={
        <CustomInput
          value={selectedDate ? moment(selectedDate).format("YYYY/MM/DD") : ""}
          ref={ref}
        />
      }
    />
  );
});

DatePickerMom.displayName = "DatePickerMom";

const CustomInput = forwardRef(({ openCalendar, value }, ref) => {
  return (
    <Input onFocus={openCalendar} value={value || ""} readOnly ref={ref} />
  );
});

CustomInput.displayName = "CustomInput";

CustomInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  openCalendar: PropTypes.func,
};

DatePickerMom.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};

export default DatePickerMom;
