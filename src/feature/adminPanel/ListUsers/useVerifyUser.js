import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyUser as verifyUserApi } from "../../../services/apiTicket"; // Ensure you create this API function in services
import { toast } from "react-hot-toast";

export function useVerifyUser() {
  const queryClient = useQueryClient();

  const { mutate: verifyUser, isLoading } = useMutation({
    mutationFn: verifyUserApi,
    onSuccess: () => {
      toast.success("یوزر با موفقیت تایید شد.");
      queryClient.invalidateQueries("admins"); // This will refetch the admin list
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { verifyUser, isLoading };
}
