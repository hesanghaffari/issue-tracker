import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useUsersList() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["listUsers", page],
    queryFn: () =>
      listUsers({
        page,
      }),
  });

  return { isLoading, error, users };
}
