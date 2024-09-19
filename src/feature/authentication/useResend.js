import { useMutation } from "@tanstack/react-query";
import { resend as resendApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useResend() {
  const { mutate: resend, isPending } = useMutation({
    mutationFn: ({ email }) => resendApi({ email }),
    onSuccess: () => {
      toast.success("کد تایید دوباره ارسال شد.");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { resend, isPending };
}
