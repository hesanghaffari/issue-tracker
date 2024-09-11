import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      Cookies.set("userEmail", user.email);

      if (user.isVerified) {
        toast.success(
          "ثبت نام با موفقیت انجام شد. لطفا وارد حساب کاربری خود شوید."
        );
        navigate("/login");
      } else {
        toast.success(
          "ثبت نام با موفقیت انجام شد. لطفا ایمیل خود را تایید کنید."
        );
        navigate("/verify-email");
      }
    },
    onError: (error) => {
      const errorMessage = error.message || "خطا";
      toast.error(errorMessage);
    },
  });

  return { signup, isPending };
}
