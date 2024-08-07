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
      const token = user.token;
      Cookies.set("authToken", token, { expires: 1, secure: true });
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      const errorMessage = error.message || "An error occurred";
      toast.error(errorMessage);
    },
  });
  console.log("useLogin isPending:", isPending);

  return { login, isPending };
}
