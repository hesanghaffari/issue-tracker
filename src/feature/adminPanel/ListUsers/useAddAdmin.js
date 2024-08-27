import { useMutation } from "@tanstack/react-query";
import { addAdmin as addAdminApi } from "../../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useAddAdmin() {
  const { mutate: addAdmin, isLoading } = useMutation({
    mutationFn: addAdminApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verufy the new account from the user's email address."
      );
    },
  });

  return { addAdmin, isLoading };
}
