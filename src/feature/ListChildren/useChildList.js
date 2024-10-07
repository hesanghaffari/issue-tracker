import { useQuery } from "@tanstack/react-query";
import { listChild } from "../../services/apiTicket";
import { useSearchParams } from "react-router-dom";

export function useChildList() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: childs,
    error,
  } = useQuery({
    queryKey: ["listChild", page],
    queryFn: () =>
      listChild({
        page,
      }),
  });

  return { isLoading, error, childs };
}
