import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail as verifyEmailApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useVerifyEmail() {
  const navigate = useNavigate();

  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: ({ otp }) => {
      const email = Cookies.get("userEmail");
      return verifyEmailApi({ otp, email });
    },
    onSuccess: () => {
      toast.success("ایمیل شما با موفقیت تایید شد.");
      Cookies.remove("userEmail");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { verifyEmail, isPending };
}
