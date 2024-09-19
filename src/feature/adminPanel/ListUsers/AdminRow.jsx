import { useDeleteAdmin } from "./useDeleteAdmin";
import PropTypes from "prop-types";
import Table from "../../../ui/Table";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ConfirmDelete from "../../../ui/ConfirmDelete";

function AdminRow({ admins, index, currentPage }) {
  const { email, role, fullname, _id } = admins;
  const { deleteAdmin, isLoading } = useDeleteAdmin();

  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  // Handle delete button click

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{fullname}</div>
      <div>{email}</div>
      <div>{role}</div>
      <div>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="small">
              حذف
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="ادمین"
              onConfirm={() => deleteAdmin(_id)}
              disabled={isLoading}
            />
          </Modal.Window>
        </Modal>
      </div>
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
