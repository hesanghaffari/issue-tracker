import PropTypes from "prop-types";
// import styles from "./TicketRowAdmin.module.css";
import Table from "../../../ui/Table";
import moment from "moment-jalaali";

function UsersRow({ users, index, currentPage }) {
  const { email, fullname, createdAt, isVerified } = users;
  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{moment(createdAt).format("jYYYY/jMM/jDD HH:mm:ss")}</div>
      <div>{email}</div>
      <div>{fullname}</div>
      <div>{isVerified ? "تایید شده" : "تایید نشده"}</div>{" "}
      {/* Display verification status */}
    </Table.Row>
  );
}

UsersRow.propTypes = {
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  users: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired, // Define isVerified as a boolean
  }).isRequired,
};

export default UsersRow;
