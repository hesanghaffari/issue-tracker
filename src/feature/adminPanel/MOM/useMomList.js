import { useQuery } from "@tanstack/react-query";
import { listMom } from "../../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useMomList() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const search = searchParams.get("search") || "";

  const {
    isLoading,
    data: moms,
    error,
  } = useQuery({
    queryKey: ["listMom", page, search],
    queryFn: () =>
      listMom({
        page,
        search,
      }),
  });

  return { isLoading, error, moms };
}
