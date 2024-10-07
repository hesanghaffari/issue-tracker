import Button from "../../../ui/Button";
import Tabs from "../../../ui/Tabs";
import Modal from "../../../ui/Modal";
import AddAdminForm from "../../../ui/AddAdminForm";
import ListAdminTable from "./ListAdminTable";
import ListUsersTable from "./ListUsersTable";
import { useAddAdmin } from "./useAddAdmin";

function AdminManagement() {
  const { addAdmin, isPending } = useAddAdmin();

  return (
    <div>
      <Modal>
        <Modal.Open opens="AddAdminForm">
          <Button>ثبت ادمین جدید</Button>
        </Modal.Open>

        <Modal.Window name="AddAdminForm">
          <AddAdminForm
            onCloseModal={() => close()}
            addAdmin={addAdmin}
            isPending={isPending}
          />
        </Modal.Window>
      </Modal>

      <Tabs tabs={["مدیران", "کاربران"]} resetParams={true}>
        <div>
          <ListAdminTable />
        </div>
        <div>
          <ListUsersTable />
        </div>
      </Tabs>
    </div>
  );
}

export default AdminManagement;
