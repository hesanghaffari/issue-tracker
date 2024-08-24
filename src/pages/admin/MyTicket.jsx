import TicketTableOperationsAdmin from "../../feature/adminPanel/submitTicket/TicketTableOperationsAdmin";
import TicketListTableAdmin from "../../feature/adminPanel/submitTicket/TicketListTableMyTicketAdmin";

function Dashboard() {
  return (
    <main>
      <TicketTableOperationsAdmin />
      <TicketListTableAdmin />
    </main>
  );
}

export default Dashboard;
