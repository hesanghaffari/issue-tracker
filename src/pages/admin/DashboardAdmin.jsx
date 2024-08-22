import TicketListTableAdmin from "../../feature/adminPanel/submitTicket/TicketListTableAdmin";
import TicketTableOperationsAdmin from "../../feature/adminPanel/submitTicket/TicketTableOperationsAdmin";

function Dashboard() {
  return (
    <main>
      <TicketTableOperationsAdmin />
      <TicketListTableAdmin />
    </main>
  );
}

export default Dashboard;
