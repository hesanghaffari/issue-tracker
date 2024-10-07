import { useQuery } from "@tanstack/react-query";
import { listUsersMom } from "../../../services/apiTicket";

export function useUsersList() {
  const {
    isLoading,
    data: usersData,
    error,
  } = useQuery({
    queryKey: ["listUsersMom"],
    queryFn: () => listUsersMom({}),
  });

  return { isLoading, error, usersData };
}
