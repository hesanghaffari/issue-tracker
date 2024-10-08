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

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // SEARCH QUERY
  const search = searchParams.get("search") || "";

  // CREATED AT (DATE FILTER)
  const date = searchParams.get("date") || "";
  // END DATE (DATE FILTER)

  // QUERY
  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["ticketsadmin", filter, problemType, page, search, date], // Add endDate to the query key
    queryFn: () =>
      ticketlistAdmin({
        filter,
        problemType,
        page,
        search,
        date,
      }), // Pass endDate to the API function
  });

  return { isLoading, error, tickets };
}
