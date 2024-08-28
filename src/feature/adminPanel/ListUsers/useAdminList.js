import { useQuery } from "@tanstack/react-query";
import { listAdmin } from "../../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useAdminList() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["listAdmin", page],
    queryFn: () =>
      listAdmin({
        page,
      }),
  });

  return { isLoading, error, tickets };
}
