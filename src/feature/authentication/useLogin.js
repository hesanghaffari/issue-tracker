import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      if (user.isVerified) {
        const token = user.token;
        const id = user.id;
        const fullname = user.fullname;
        const userRole = user.role;
        Cookies.set("fullname", fullname, { expires: 1, secure: true });
        Cookies.set("authToken", token, { expires: 1, secure: true });
        Cookies.set("userRole", userRole, { expires: 1, secure: true });
        Cookies.set("userID", id);
        Cookies.set("userEmail", user.email, { expires: 1, secure: true });
        queryClient.setQueryData(["user"], user.user);
        navigate("/dashboard");
        toast.success("باز که پیدات شد!😒");
      } else {
        toast.success("لطفا ایمیل خود را تایید کنید.");
        navigate("/verify-email");
      }
    },
    onError: (error) => {
      const errorMessage = error.message || "خطا در ورود.";
      toast.error(errorMessage);
    },
  });

  return { login, isPending };
}
