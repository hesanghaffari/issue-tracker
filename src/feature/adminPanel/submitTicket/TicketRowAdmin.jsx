import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./TicketRowAdmin.module.css";
import Button from "../../../ui/Button";

import Table from "../../../ui/Table";

function TicketRow({ tickets, index }) {
  const { company, requestTitle, licenseCode, problemType, _id } = tickets;
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/dashboardadmin/${_id}`);
  };

  return (
    <Table.Row>
      <div>{index + 1}</div>
      <div className={styles.tickets}>{company}</div>
      <div>{requestTitle}</div>
      <div className={styles.price}>{licenseCode}</div>
      <div>{problemType}</div>
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

  tickets: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    company: PropTypes.string.isRequired,
    requestTitle: PropTypes.string.isRequired,
    licenseCode: PropTypes.string.isRequired,
    problemType: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketRow;
