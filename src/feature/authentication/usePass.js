import { useMutation } from "@tanstack/react-query";
import { pass as passApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function usePass() {
  const navigate = useNavigate();
  const { mutate: pass, isPending } = useMutation({
    mutationFn: ({ email }) => passApi({ email }),
    onSuccess: () => {
      navigate("/login", { replace: true });

      toast.success("لطفا ایمیل خود را چک کنید.");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { pass, isPending };
}
