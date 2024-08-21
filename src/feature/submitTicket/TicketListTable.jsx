import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ticketlist } from "../../services/apiTicket";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";

import TicketRow from "./TicketRow";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
// import styles from "./TicketListTable.module.css";
function TicketListTable() {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  const {
    isLoading,
    data: tickets,
    isFetching,
  } = useQuery({
    queryKey: ["tickets", page],
    queryFn: () => ticketlist(page, filter),
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;
  if (!tickets?.tickets.length) return <Empty resourceName="ایشو" />;

  const startIndex = (page - 1) * 10;
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
          // data={cabins}
          // data={filteredCabins}
          data={tickets}
          render={(tickets, index) => (
            <TicketRow
              tickets={tickets}
              key={tickets._id}
              index={startIndex + index}
            />
          )}
        />
      </Table>
      <Pagination
        currentPage={page}
        totalPages={tickets.totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        isFetching={isFetching}
      />
    </>
  );
}

export default TicketListTable;
