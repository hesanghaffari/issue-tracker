import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./TicketRow.module.css";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";

import Table from "../../ui/Table";

function TicketRow({ tickets, index, currentPage }) {
  const { company, requestTitle, licenseCode, problemType, _id, status } =
    tickets;
  const navigate = useNavigate();

  const statusToTagName = {
    "در حال بررسی": "blue",
    "ثبت شده": "green",
    "در انتظار پاسخ": "yellow",
    "حل شده": "silver",
  };

  const handleDetailClick = () => {
    navigate(`/dashboard/${_id}`);
  };

  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div className={styles.tickets}>{company}</div>
      <div>{requestTitle}</div>
      <div className={styles.price}>{licenseCode}</div>
      <div>{problemType}</div>
      <div>
        <Tag type={statusToTagName[status]}>{status}</Tag>
      </div>
      <div>
        <Button size="small" variation="secondary" onClick={handleDetailClick}>
          مشاهده
        </Button>
      </div>
    </Table.Row>
  );
}

TicketRow.propTypes = {
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired, // Add currentPage as a prop type
  tickets: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    company: PropTypes.string.isRequired,
    requestTitle: PropTypes.string.isRequired,
    licenseCode: PropTypes.string.isRequired,
    problemType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketRow;
