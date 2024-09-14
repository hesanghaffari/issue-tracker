import TicketTableOperationsAdmin from "../../feature/adminPanel/submitTicket/TicketTableOperationsAdmin";
import TicketListTableAdmin from "../../feature/adminPanel/submitTicket/TicketListTableMyTicketAdmin";

function Dashboard() {
  return (
    <main>
      <TicketTableOperationsAdmin showExcelButton={false} />
      <TicketListTableAdmin />
    </main>
  );
}

export default Dashboard;
