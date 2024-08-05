import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAdmin as loginAdminApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLoginAdmin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginAdmin, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginAdminApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      const errorMessage = error.message || "An error occurred";
      toast.error(errorMessage);
    },
  });
  console.log("useLogin isPending:", isPending);

  return { loginAdmin, isPending };
}
