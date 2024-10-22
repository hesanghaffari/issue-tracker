import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdmin as addAdminApi } from "../../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useAddAdmin() {
  const queryClient = useQueryClient();

  const { mutate: addAdmin, isLoading } = useMutation({
    mutationFn: addAdminApi,
    onSuccess: () => {
      toast.success("ادمین جدید با موفقیت ساخته شد.");
      queryClient.invalidateQueries("listAdmin");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { addAdmin, isLoading };
}
