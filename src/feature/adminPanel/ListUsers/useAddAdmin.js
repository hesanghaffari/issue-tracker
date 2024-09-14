import { useMutation } from "@tanstack/react-query";
import { addAdmin as addAdminApi } from "../../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useAddAdmin() {
  const { mutate: addAdmin, isLoading } = useMutation({
    mutationFn: addAdminApi,
    onSuccess: () => {
      toast.success("ادمین جدید با موفقیت ساخته شد.");
    },
    onError: (error) => {
      const errorMessage = error.message || "خطا در ورود.";
      toast.error(errorMessage);
    },
  });

  return { addAdmin, isLoading };
}
