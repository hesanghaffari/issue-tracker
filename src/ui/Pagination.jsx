import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / 10);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className={styles.pagination}>
      <p className={styles.text}>
        نمایش <span>{(currentPage - 1) * 10 + 1}</span> تا{" "}
        <span>{currentPage === pageCount ? count : currentPage * 10}</span> از{" "}
        <span>{count}</span> تیکت
      </p>

      <div className={styles.buttons}>
        <button
          className={`${styles.paginationButton} ${
            currentPage === 1 ? "" : styles.paginationButtonActive
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronRight /> <span>قبلی</span>
        </button>

        <button
          className={`${styles.paginationButton} ${
            currentPage === pageCount ? "" : styles.paginationButtonActive
          }`}
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>بعدی</span>
          <HiChevronLeft />
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Pagination;
