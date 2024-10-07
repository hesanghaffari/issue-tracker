import { useQuery } from "@tanstack/react-query";
import { listMom } from "../../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useMomList() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: moms,
    error,
  } = useQuery({
    queryKey: ["listMom", page],
    queryFn: () =>
      listMom({
        page,
      }),
  });

  return { isLoading, error, moms };
}
