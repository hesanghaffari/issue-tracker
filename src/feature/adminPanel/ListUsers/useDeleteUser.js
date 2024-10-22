import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../../services/apiTicket";
import { toast } from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("کاربر با موفقیت حذف شد.");
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { deleteUser, isLoading };
}
