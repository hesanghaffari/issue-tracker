import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "./Select";

function SortBy({ options, paramName }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(paramName) || "";

  function handleChange(e) {
    searchParams.set(paramName, e.target.value);
    searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  paramName: PropTypes.string.isRequired,
};

export default SortBy;
