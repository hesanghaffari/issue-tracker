import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./TicketRowAdmin.module.css";
import Button from "../../../ui/Button";
import Tag from "../../../ui/Tag";
import Table from "../../../ui/Table";

function TicketRow({ tickets, index, currentPage }) {
  const {
    company,
    requestTitle,
    licenseCode,
    problemType,
    _id,
    status,
    assignedToName,
  } = tickets;
  const navigate = useNavigate();

  const statusToTagName = {
    "در حال بررسی": "blue",
    "ثبت شده": "green",
    "در انتظار پاسخ": "yellow",
    "حل شده": "silver",
  };

  const handleDetailClick = () => {
    navigate(`/dashboardadmin/${_id}`);
  };

  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div className={styles.tickets}>{company}</div>
      <div>{requestTitle}</div>
      <div>{licenseCode}</div>
      <div>{problemType}</div>
      <div>
        <Tag type={statusToTagName[status]}>{status}</Tag>
      </div>
      <div>
        <div className={styles.tooltip}>
          <Button
            size="small"
            variation="secondary"
            onClick={handleDetailClick}
          >
            مشاهده
          </Button>
          <div className={styles.tooltipText}>اینجنت: {assignedToName}</div>
        </div>
      </div>
    </Table.Row>
  );
}

TicketRow.propTypes = {
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  tickets: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    company: PropTypes.string.isRequired,
    requestTitle: PropTypes.string.isRequired,
    licenseCode: PropTypes.string.isRequired,
    problemType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    assignedToName: PropTypes.string, // Add assignTo to prop types
  }).isRequired,
};

export default TicketRow;
