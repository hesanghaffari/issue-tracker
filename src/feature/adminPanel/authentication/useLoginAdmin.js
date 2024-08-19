import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAdmin as loginAdminApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function useLoginAdmin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginAdmin, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginAdminApi({ email, password }),
    onSuccess: (user) => {
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
      navigate("/dashboardadmin");
    },
    onError: (error) => {
      const errorMessage = error.message || "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { loginAdmin, isPending };
}
