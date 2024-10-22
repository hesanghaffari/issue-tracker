import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useUsersList() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const role = searchParams.get("role") || "";
  const isAdminVerified = searchParams.get("isAdminVerified") || "";
  const search = searchParams.get("search") || ""; // Extract company search param
  const date = searchParams.get("date") || ""; // Extract company search param

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["listUsers", page, role, isAdminVerified, search, date],
    queryFn: () =>
      listUsers({
        page,
        role,
        isAdminVerified,
        search,
        date,
      }),
  });

  return { isLoading, error, users };
}
