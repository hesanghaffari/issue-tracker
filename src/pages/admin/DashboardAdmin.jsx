import TicketListTableAdmin from "../../feature/adminPanel/submitTicket/TicketListTableAdmin";
import TicketTableOperations from "../../feature/submitTicket/TicketTableOperations";

function Dashboard() {
  return (
    <main>
      <TicketTableOperations />
      <TicketListTableAdmin />
    </main>
  );
}

export default Dashboard;
