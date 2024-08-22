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
  const search = searchParams.get("search") || ""; // Get the search query from the URL

  // QUERY
  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["tickets", filter, problemType, page, search], // Add searchQuery to the query key
    queryFn: () => ticketlistAdmin({ filter, problemType, page, search }), // Pass searchQuery to the API function
  });

  return { isLoading, error, tickets };
}
