import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "ثبت نام با موفقیت انجام شد.لطفا وارد حساب کاربری خود شوید."
      );
      navigate("/login");
    },
  });

  return { signup, isLoading };
}
