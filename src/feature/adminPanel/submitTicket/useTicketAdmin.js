import { useQuery } from "@tanstack/react-query";
import { ticketlistAdmin } from "../../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useTicketAdmin() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === ""
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const problemType = searchParams.get("problemType") || "";
  const company = searchParams.get("company") || "";

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["tickets", filter, problemType, page, company],
    queryFn: () => ticketlistAdmin({ filter, problemType, page, company }),
  });

  return { isLoading, error, tickets };
}
