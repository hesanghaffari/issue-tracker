import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMom as deleteMomApi } from "../../../services/apiTicket";
import { toast } from "react-hot-toast";

export function useDeleteMom() {
  const queryClient = useQueryClient();

  const { mutate: deleteMom, isLoading } = useMutation({
    mutationFn: deleteMomApi,
    onSuccess: () => {
      toast.success("صورت جلسه با موفقیت حذف شد.");
      queryClient.invalidateQueries("listMom"); // This will refetch the admin list
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { deleteMom, isLoading };
}
