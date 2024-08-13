import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Select.module.css";

const Select = forwardRef(({ options, onChange, type, ...props }, ref) => {
  const selectClassName =
    type === "white" ? `${styles.select} ${styles.selectWhite}` : styles.select;

  return (
    <select
      ref={ref}
      onChange={onChange}
      className={selectClassName}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = "Select";

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Select;
