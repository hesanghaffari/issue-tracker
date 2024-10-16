import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyUser as verifyUserApi } from "../../../services/apiTicket"; // Ensure you create this API function in services
import { toast } from "react-hot-toast";

export function useVerifyUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUserStatus, isPending } = useMutation({
    mutationFn: ({ userId, status }) => verifyUserApi(userId, status),
    onSuccess: (response) => {
      toast.success(response || "عملیات با موفقیت انجام شد.");
      queryClient.invalidateQueries("admins"); // This will refetch the admin list
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { updateUserStatus, isPending };
}
