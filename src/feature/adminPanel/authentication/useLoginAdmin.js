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
      Cookies.set("fullname", fullname);
      Cookies.set("authToken", token);
      Cookies.set("userRole", userRole);
      Cookies.set("userID", id);
      Cookies.set("userEmail", user.email);
      queryClient.setQueryData(["user"], user.user);
      toast.success("ورود موفق!");

      navigate("/dashboardadmin");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { loginAdmin, isPending };
}
