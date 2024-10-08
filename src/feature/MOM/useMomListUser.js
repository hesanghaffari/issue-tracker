import { useQuery } from "@tanstack/react-query";
import { listMomuser } from "../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useMomList() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: moms,
    error,
  } = useQuery({
    queryKey: ["listMomuser", page],
    queryFn: () =>
      listMomuser({
        page,
      }),
  });

  return { isLoading, error, moms };
}
