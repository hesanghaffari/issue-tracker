import { useVerifyUser } from "./useVerifyUser"; // Import the updated hook
import PropTypes from "prop-types";
import Table from "../../../ui/Table";
import moment from "moment-jalaali";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Dropdown from "../../../ui/Dropdown";

function UsersRow({ users, index, currentPage }) {
  const { email, fullname, createdAt, isVerified, isAdminVerified, _id } =
    users;
  const { updateUserStatus, isLoading: isUpdating } = useVerifyUser();

  const displayIndex = index + 1 + (currentPage - 1) * 10;

  const options = [
    { value: "accept", label: "تایید " },
    { value: "reject", label: "رد " },
  ];

  const handleActionSelect = (action) => {
    // Only make the request for valid actions ("accept" or "reject")
    if (action !== "") {
      updateUserStatus({ userId: _id, status: action });
    }
  };

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{moment(createdAt).format("jYYYY/jMM/jDD HH:mm:ss")}</div>
      <div>{email}</div>
      <div>{fullname}</div>
      <div>{isVerified ? "تایید شده" : "تایید نشده"}</div>
      <div>
        <Dropdown
          options={options} // Dropdown options (accept/reject)
          isAdminVerified={isAdminVerified} // Pass verification status
          onActionSelect={handleActionSelect} // Handle selected action
        />
      </div>
      <div>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="small" disabled={isUpdating}>
              حذف
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="کاربر"
              onConfirm={() => handleActionSelect("delete")} // Handle delete action
              disabled={isUpdating}
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
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired,
    isAdminVerified: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UsersRow;
