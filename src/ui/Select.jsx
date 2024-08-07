import PropTypes from "prop-types";
import styles from "./Select.module.css";

function Select({ options, value, onChange, type, ...props }) {
  const selectClassName =
    type === "white" ? `${styles.select} ${styles.selectWhite}` : styles.select;

  return (
    <select
      value={value}
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
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Select;
