import TicketListTable from "../feature/submitTicket/TicketListTable";
import TicketTableOperations from "../feature/submitTicket/TicketTableOperations";

function Dashboard() {
  return (
    <main>
      <TicketTableOperations />
      <TicketListTable />
    </main>
  );
}

export default Dashboard;
