import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import opacity from "react-element-popper/animations/opacity";
import persian from "react-date-object/calendars/persian";
import { HiArrowPath } from "react-icons/hi2";

import persian_fa from "react-date-object/locales/persian_fa";
import { useSearchParams } from "react-router-dom";
import moment from "moment-jalaali";
import PropTypes from "prop-types";
import Input from "./Input";
import Button from "./Button";
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export default function ShamsiDatePicker({ paramName }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const paramValue = searchParams.get(paramName);
    if (paramValue) {
      const date = moment(paramValue, "YYYY-MM-DD").toDate();
      setSelectedDate(date);
    }
  }, [paramName, searchParams]);

  const handleDateChange = (date) => {
    if (date) {
      const gregorianDate = moment(date.toDate()).format("YYYY-MM-DD");
      searchParams.set(paramName, gregorianDate);
    } else {
      searchParams.delete(paramName);
    }
    setSelectedDate(date);
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSelectedDate(null);
    searchParams.delete(paramName);
    setSearchParams(searchParams);
  };

  ShamsiDatePicker.propTypes = {
    paramName: PropTypes.string.isRequired,
  };

  return (
    <div style={{ direction: "rtl" }}>
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
            value={
              selectedDate ? moment(selectedDate).format("YYYY/MM/DD") : ""
            }
          />
        }
      />
      <Button
        style={{ marginRight: "5px", padding: "1rem" }}
        onClick={handleReset}
      >
        <HiArrowPath />
      </Button>
    </div>
  );
}

function CustomInput({ openCalendar, value }) {
  return (
    <Input
      onFocus={openCalendar}
      value={value || ""}
      placeholder="تاریخ شروع"
      readOnly
    />
  );
}

CustomInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  openCalendar: PropTypes.func,
};
