import { useQuery } from "@tanstack/react-query";
import { ticketlist } from "../../services/apiTicket";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

import TicketRow from "./TicketRow";
import Empty from "../../ui/Empty";
// import styles from "./TicketListTable.module.css";
function TicketListTable() {
  const { isLoading, data: tickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: ticketlist,
  });
  if (isLoading) return <Spinner />;
  if (!tickets.tickets.length) return <Empty resourceName="ایشو" />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>#</div>
        <div>شرکت</div>
        <div>موضوع تیکت</div>
        <div>لایسنس کد</div>
        <div>نوع تیکت</div>
      </Table.Header>

      <Table.Body
        // data={cabins}
        // data={filteredCabins}
        data={tickets}
        render={(tickets, index) => (
          <TicketRow tickets={tickets} key={tickets._id} index={index} />
        )}
      />
    </Table>
  );
}

export default TicketListTable;
