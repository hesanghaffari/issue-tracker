// import { useState } from "react";
import Button from "../../../ui/Button";
import Tabs from "../../../ui/Tabs";
import Modal from "../../../ui/Modal";
import AddAdminForm from "../../../ui/AddAdminForm";
import ListAdminTable from "./ListAdminTable";
// import styles from "./AdminManagement.module.css";

function AdminManagement() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* <Button onClick={() => setIsModalOpen(true)}>افزودن مدیر جدید</Button> */}

      <Modal>
        <Modal.Open opens="AddAdminForm">
          <Button>ثبت ادمین جدید</Button>
        </Modal.Open>

        <Modal.Window name="AddAdminForm">
          <AddAdminForm />
        </Modal.Window>
      </Modal>
      <Tabs tabs={["مدیران", "کاربران"]}>
        <div>
          {/* List of admins goes here */}
          <ListAdminTable />
        </div>
        <div>
          {/* List of users goes here */}
          <p>اینجا لیست کاربران خواهد بود</p>
        </div>
      </Tabs>

      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddAdminForm />
      </Modal> */}
    </div>
  );
}

export default AdminManagement;
