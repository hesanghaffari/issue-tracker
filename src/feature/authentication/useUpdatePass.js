import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useUpdatePass() {
  const navigate = useNavigate();

  const { mutate: updatepass, isPending } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success("رمزعبور شما با موفقیت تغییر یافت.");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { updatepass, isPending };
}
