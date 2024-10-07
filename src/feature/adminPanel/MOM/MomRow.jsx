import { useDeleteMom } from "./useDeleteMom";
import PropTypes from "prop-types";
import Table from "../../../ui/Table";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ConfirmDelete from "../../../ui/ConfirmDelete";

function ChildRow({ admins, index, currentPage }) {
  const { company, title, _id, date } = admins;
  const { deleteMom, isLoading } = useDeleteMom();

  // Calculate the correct index based on the current page
  const displayIndex = index + 1 + (currentPage - 1) * 10;

  // Handle delete button click

  return (
    <Table.Row>
      <div>{displayIndex}</div>
      <div>{date}</div>
      <div>{title}</div>
      <div>{company}</div>
      <div>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" size="small">
              حذف
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="صورت جلسه"
              onConfirm={() => deleteMom(_id)}
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
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChildRow;
