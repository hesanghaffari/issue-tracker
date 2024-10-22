import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdmin as deleteAdminApi } from "../../../services/apiTicket";
import { toast } from "react-hot-toast";

export function useDeleteAdmin() {
  const queryClient = useQueryClient();

  const { mutate: deleteAdmin, isLoading } = useMutation({
    mutationFn: deleteAdminApi,
    onSuccess: () => {
      toast.success("ادمین با موفقیت حذف شد.");
      queryClient.invalidateQueries("admins");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { deleteAdmin, isLoading };
}
