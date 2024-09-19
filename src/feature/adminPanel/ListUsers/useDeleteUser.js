import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../../services/apiTicket"; // Ensure you create this API function in services
import { toast } from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("کاربر با موفقیت حذف شد.");
      queryClient.invalidateQueries("users"); // This will refetch the user list
    },
    onError: (error) => {
      const errorMessage = error.message || "خطا در حذف.";
      toast.error(errorMessage);
    },
  });

  return { deleteUser, isLoading };
}
