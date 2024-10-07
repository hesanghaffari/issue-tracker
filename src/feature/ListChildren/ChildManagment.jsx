import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddChildForm from "../../ui/AddChildForm";
import ListChildTable from "./ListChildTable";
import { useAddChild } from "./useAddChild";

function ChildManagment() {
  const { addChild, isPending } = useAddChild();

  return (
    <div>
      <Modal>
        <Modal.Open opens="AddAdminForm">
          <Button>ثبت یوزر جدید</Button>
        </Modal.Open>

        <Modal.Window name="AddAdminForm">
          <AddChildForm
            onCloseModal={() => close()}
            addAdmin={addChild}
            isPending={isPending}
          />
        </Modal.Window>
      </Modal>
      <ListChildTable />
    </div>
  );
}

export default ChildManagment;
