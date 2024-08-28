import PropTypes from "prop-types";
import styles from "./TicketRowAdmin.module.css";
import Table from "../../../ui/Table";

function TicketRow({ tickets, index, currentPage }) {
  const { email, password, role, _id, fullname } = tickets;

  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{fullname}</div>
      <div>{role}</div>
      <div className={styles.tickets}>{_id}</div>
      <div>{email}</div>
      <div>{password}</div>
    </Table.Row>
  );
}

TicketRow.propTypes = {
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  tickets: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketRow;
