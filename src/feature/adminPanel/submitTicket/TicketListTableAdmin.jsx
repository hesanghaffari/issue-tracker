import {} from "react";
import { useTicketAdmin } from "./useTicketAdmin";

import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import TicketRow from "./TicketRowAdmin";
import Empty from "../../../ui/Empty";
import Pagination from "../../../ui/Pagination";

function TicketListTable() {
  const { tickets, isLoading } = useTicketAdmin();
  if (isLoading) return <Spinner />;
  if (!tickets?.tickets.length) return <Empty resourceName="ایشو" />;

  return (
    <>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>#</div>
          <div>شرکت</div>
          <div>موضوع تیکت</div>
          <div>لایسنس کد</div>
          <div>نوع تیکت</div>
        </Table.Header>

        <Table.Body
          data={tickets}
          render={(ticket, index) => (
            <TicketRow tickets={ticket} key={ticket._id} index={index} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={tickets.totalTickets} />
      </Table.Footer>
    </>
  );
}

export default TicketListTable;
