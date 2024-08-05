import { useMutation } from "@tanstack/react-query";
import { pass as passApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function usePass() {
  const { mutate: pass, isPending } = useMutation({
    mutationFn: ({ email }) => passApi({ email }),
    onSuccess: () => {
      toast.success("لطفا ایمیل خود را چک کنید.");
    },
    onError: (error) => {
      const errorMessage = error.message || "خطا";
      toast.error(errorMessage);
    },
  });

  return { pass, isPending };
}
