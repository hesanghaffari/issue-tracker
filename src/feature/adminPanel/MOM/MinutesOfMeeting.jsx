import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import AddMomForm from "../../../ui/AddMomForm";
import ListChildTable from "./ListMomTable";
import { useAddMom } from "./useAddMom";
import Search from "../../../ui/Search";

function ChildManagment() {
  const { addMom, isPending } = useAddMom();

  return (
    <div>
      <Search />
      <Modal>
        <Modal.Open opens="AddMomForm">
          <Button>ثبت صورت جلسه جدید</Button>
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
