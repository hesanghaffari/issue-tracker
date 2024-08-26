import { useSearchParams } from "react-router-dom";
import { useKey } from "./useKey";
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import styles from "./Search.module.css";
function Search() {
  const [query, setQuery] = useState(""); // Local state for the input
  const [searchParams, setSearchParams] = useSearchParams();
  const inputEl = useRef(null);

  // Update query from URL params on mount
  useEffect(() => {
    const queryFromUrl = searchParams.get("search") || "";
    setQuery(queryFromUrl);
  }, [searchParams]);

  // Handle the Enter key press
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
    searchParams.delete("search"); // Clear the URL parameter when Enter is pressed and input is empty
    setSearchParams(searchParams);
  });

  // Handle input change
  function handleChange(e) {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Update the URL parameter
    if (newQuery) {
      searchParams.set("search", newQuery);
    } else {
      searchParams.delete("search"); // Remove the query param if the input is cleared
    }
    setSearchParams(searchParams);
  }

  return (
    <div className={styles.searchcenter}>
      <Input
        type="text"
        placeholder="جستجو..."
        value={query}
        onChange={handleChange}
        ref={inputEl}
      />
    </div>
  );
}

Search.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

export default Search;
