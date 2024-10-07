import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import AddMomForm from "../../../ui/AddMomForm";
import ListChildTable from "./ListMomTable";
import { useAddMom } from "./useAddMom";

function ChildManagment() {
  const { addMom, isPending } = useAddMom();

  return (
    <div>
      <Modal>
        <Modal.Open opens="AddMomForm">
          <Button>ثبت MOM جدید</Button>
        </Modal.Open>

        <Modal.Window name="AddMomForm">
          <AddMomForm
            onCloseModal={() => close()}
            addAdmin={addMom}
            isPending={isPending}
          />
        </Modal.Window>
      </Modal>
      <ListChildTable />
    </div>
  );
}

export default ChildManagment;
