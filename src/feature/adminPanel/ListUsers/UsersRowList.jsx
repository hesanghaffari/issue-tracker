import { useDeleteUser } from "./useDeleteUser"; // Import the hook
import PropTypes from "prop-types";
import Table from "../../../ui/Table";
import moment from "moment-jalaali";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ConfirmDelete from "../../../ui/ConfirmDelete";

function UsersRow({ users, index, currentPage }) {
  const { email, fullname, createdAt, isVerified, _id } = users; // Ensure _id is part of users
  const { deleteUser, isLoading } = useDeleteUser();

  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{moment(createdAt).format("jYYYY/jMM/jDD HH:mm:ss")}</div>
      <div>{email}</div>
      <div>{fullname}</div>
      <div>{isVerified ? "تایید شده" : "تایید نشده"}</div>{" "}
      {/* Verification status */}
      <div>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="small">
              حذف
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="کاربر"
              onConfirm={() => deleteUser(_id)} // Call delete user API
              disabled={isLoading}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

UsersRow.propTypes = {
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  users: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // Ensure _id exists
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired, // Define isVerified as a boolean
  }).isRequired,
};

export default UsersRow;
