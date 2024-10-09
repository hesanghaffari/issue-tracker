import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import AddMomForm from "../../../ui/AddMomForm";
import ListChildTable from "./ListMomTable";
import { useAddMom } from "./useAddMom";
import Search from "../../../ui/Search";

function ChildManagement() {
  const { addMom, isPending } = useAddMom();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
      </div>
      <ListChildTable />
    </div>
  );
}

export default ChildManagement;
