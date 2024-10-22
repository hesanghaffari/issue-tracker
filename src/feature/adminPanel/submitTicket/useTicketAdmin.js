import { useQuery } from "@tanstack/react-query";
import { ticketlistAdmin } from "../../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useTicketAdmin() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === ""
      ? null
      : { field: "status", value: filterValue };

  const problemType = searchParams.get("problemType") || "";

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const search = searchParams.get("search") || "";

  const date = searchParams.get("date") || "";

  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["ticketsadmin", filter, problemType, page, search, date],
    queryFn: () =>
      ticketlistAdmin({
        filter,
        problemType,
        page,
        search,
        date,
      }),
  });

  return { isLoading, error, tickets };
}
