import { useSearchParams } from "react-router-dom";
import { useKey } from "./useKey";
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import styles from "./Search.module.css";
function Search() {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const inputEl = useRef(null);

  useEffect(() => {
    const queryFromUrl = searchParams.get("search") || "";
    setQuery(queryFromUrl);
  }, [searchParams]);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  });

  function handleChange(e) {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery) {
      searchParams.set("search", newQuery);
    } else {
      searchParams.delete("search");
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
