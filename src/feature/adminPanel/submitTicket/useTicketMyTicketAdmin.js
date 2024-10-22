import { useQuery } from "@tanstack/react-query";
import { ticketlistAdminMyTicket } from "../../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useTicketMyTicketAdmin() {
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

  //
  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["myowntickets", filter, problemType, page, search, date],
    queryFn: () =>
      ticketlistAdminMyTicket({
        filter,
        problemType,
        page,
        search,
        date,
      }),
  });

  return { isLoading, error, tickets };
}
