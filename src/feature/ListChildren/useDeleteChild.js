import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChild as deleteChildApi } from "../../services/apiTicket";
import { toast } from "react-hot-toast";

export function useDeleteChild() {
  const queryClient = useQueryClient();

  const { mutate: deleteChild, isLoading } = useMutation({
    mutationFn: deleteChildApi,
    onSuccess: () => {
      toast.success("یوزر با موفقیت حذف شد.");
      queryClient.invalidateQueries("listChild"); // This will refetch the admin list
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { deleteChild, isLoading };
}
