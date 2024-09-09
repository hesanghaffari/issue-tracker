import PropTypes from "prop-types";
// import styles from "./TicketRowAdmin.module.css";
import Table from "../../../ui/Table";

function AdminRow({ admins, index, currentPage }) {
  const { email, role, fullname } = admins;

  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{fullname}</div>
      <div>{email}</div>
      <div>{role}</div>
    </Table.Row>
  );
}

AdminRow.propTypes = {
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  admins: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminRow;
