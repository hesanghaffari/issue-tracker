import { useDeleteChild } from "./useDeleteChild";
import PropTypes from "prop-types";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";

function ChildRow({ admins, index, currentPage }) {
  const { email, role, fullname, _id } = admins;
  const { deleteChild, isLoading } = useDeleteChild();

  const displayIndex = index + 1 + (currentPage - 1) * 10;
  const roleText = role === "user" ? "اصلی" : role === "child" ? "فرعی" : "";

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{fullname}</div>
      <div>{email}</div>
      <div>{roleText}</div>
      <div>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="small">
              حذف
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="یوزر"
              onConfirm={() => deleteChild(_id)}
              disabled={isLoading}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

ChildRow.propTypes = {
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  admins: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChildRow;
