import { useVerifyUser } from "./useVerifyUser";
import PropTypes from "prop-types";
import Table from "../../../ui/Table";
import moment from "moment-jalaali";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Dropdown from "../../../ui/Dropdown";
import { useDeleteUser } from "./useDeleteUser";

function UsersRow({ users, index, currentPage }) {
  const { email, fullname, createdAt, isAdminVerified, _id, role, company } =
    users;
  const { updateUserStatus, isPending: isVerify } = useVerifyUser();
  const { deleteUser, isPending: isDeleting } = useDeleteUser();

  const displayIndex = index + 1 + (currentPage - 1) * 10;

  const options = [
    { value: "accept", label: "تایید " },
    { value: "reject", label: "رد " },
    { value: "unverified", label: "تعیین نشده" },
  ];

  const handleActionSelect = (action) => {
    if (action !== "" && action !== "unverified") {
      updateUserStatus({ userId: _id, status: action });
    }
  };

  const roleText = role === "user" ? "اصلی" : role === "child" ? "فرعی" : "";

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{moment(createdAt).format("jYYYY/jMM/jDD HH:mm:ss")}</div>
      <div>{email}</div>
      <div>{fullname}</div>
      <div>{roleText}</div>
      <div>{company}</div>
      <div>
        {isAdminVerified === null
          ? "تعیین نشده"
          : isAdminVerified
          ? "تایید شده"
          : "تایید نشده"}
      </div>
      <div>
        <Dropdown
          options={options}
          isAdminVerified={isAdminVerified}
          onActionSelect={handleActionSelect}
          isPending={isVerify}
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
              onConfirm={() => deleteUser(_id)}
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
    isAdminVerified: PropTypes.bool,
    role: PropTypes.oneOf(["user", "child"]).isRequired,
    company: PropTypes.string.isRequired,
  }).isRequired,
};

export default UsersRow;
