import { useSearchParams } from "react-router-dom";
import { useTicketMyTicketAdmin } from "./useTicketMyTicketAdmin";

import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import TicketRow from "./TicketRowMyTicketAdmin";
import Empty from "../../../ui/Empty";
import Pagination from "../../../ui/Pagination";

function TicketListTable() {
  const { tickets, isLoading } = useTicketMyTicketAdmin();
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  if (isLoading) return <Spinner />;
  if (!tickets?.tickets.length) return <Empty resourceName="ایشو" />;

  return (
    <>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>#</div>
          <div>شرکت</div>
          <div>موضوع تیکت</div>
          <div>لایسنس کد</div>
          <div>نوع تیکت</div>
          <div>وضعیت</div>
        </Table.Header>

        <Table.Body
          data={tickets}
          render={(ticket, index) => (
            <TicketRow
              tickets={ticket}
              key={ticket._id}
              index={index}
              currentPage={currentPage} // Pass the currentPage as a prop
            />
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
