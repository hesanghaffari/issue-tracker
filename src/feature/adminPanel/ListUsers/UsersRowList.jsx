import { useVerifyUser } from "./useVerifyUser"; // Import the updated hook
import PropTypes from "prop-types";
import Table from "../../../ui/Table";
import moment from "moment-jalaali";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Dropdown from "../../../ui/Dropdown";
import { useDeleteUser } from "./useDeleteUser"; // Import the hook

function UsersRow({ users, index, currentPage }) {
  const { email, fullname, createdAt, isAdminVerified, _id, role, company } =
    users; // Destructure role and company
  const { updateUserStatus, isPending: isVerify } = useVerifyUser();
  const { deleteUser, isPending: isDeleting } = useDeleteUser();

  const displayIndex = index + 1 + (currentPage - 1) * 10;

  const options = [
    { value: "accept", label: "تایید " },
    { value: "reject", label: "رد " },
    { value: "unverified", label: "تعیین نشده" }, // Added option for unverified
  ];

  const handleActionSelect = (action) => {
    // Only make the request for valid actions ("accept" or "reject")
    if (action !== "" && action !== "unverified") {
      updateUserStatus({ userId: _id, status: action });
    }
  };

  // Determine role text
  const roleText = role === "user" ? "اصلی" : role === "child" ? "فرعی" : "";

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{moment(createdAt).format("jYYYY/jMM/jDD HH:mm:ss")}</div>
      <div>{email}</div>
      <div>{fullname}</div>
      <div>{roleText}</div> {/* Display role */}
      <div>{company}</div> {/* Display company */}
      <div>
        {isAdminVerified === null
          ? "تعیین نشده"
          : isAdminVerified
          ? "تایید شده"
          : "تایید نشده"}
      </div>
      <div>
        <Dropdown
          options={options} // Dropdown options (accept/reject/unverified)
          isAdminVerified={isAdminVerified} // Pass verification status
          onActionSelect={handleActionSelect} // Handle selected action
          isPending={isVerify} // Pass your loading state here
        />
      </div>
      <div>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="small" disabled={isDeleting}>
              حذف
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="کاربر"
              onConfirm={() => deleteUser(_id)} // Call delete user API
              disabled={isDeleting}
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
    isAdminVerified: PropTypes.bool, // Changed to allow null values
    role: PropTypes.oneOf(["user", "child"]).isRequired, // Added role prop
    company: PropTypes.string.isRequired, // Added company prop
  }).isRequired,
};

export default UsersRow;
