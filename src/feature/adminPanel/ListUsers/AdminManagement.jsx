import Button from "../../../ui/Button";
import Tabs from "../../../ui/Tabs";
import Modal from "../../../ui/Modal";
import AddAdminForm from "../../../ui/AddAdminForm";
import ListAdminTable from "./ListAdminTable";
import ListUsersTable from "./ListUsersTable";
import { useAddAdmin } from "./useAddAdmin";
import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";
import Search from "../../../ui/Search";
import ShamsiDatePicker from "../../../ui/ShamsiDatePicker";

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
        {/* Admin Tab */}
        <div>
          <ListAdminTable />
        </div>

        {/* Users Tab with Filters and Sorting */}
        <div>
          <TableOperations>
            <Search />
            <Filter
              filterField="role"
              options={[
                { value: "", label: "همه نقش‌ها" },
                { value: "user", label: "اصلی" },
                { value: "child", label: "فرعی" },
              ]}
            />

            <Filter
              filterField="isAdminVerified"
              options={[
                { value: "", label: "همه" },
                { value: "true", label: "تایید شده" },
                { value: "false", label: "تایید نشده" },
                { value: "null", label: "تعیین نشده" },
              ]}
            />
            <ShamsiDatePicker paramName="date" />
          </TableOperations>

          <ListUsersTable />
        </div>
      </Tabs>
    </div>
  );
}

export default AdminManagement;
