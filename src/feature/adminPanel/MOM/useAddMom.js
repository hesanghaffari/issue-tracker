import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMom as addMomApi } from "../../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useAddMom() {
  const queryClient = useQueryClient();

  const { mutate: addMom, isLoading } = useMutation({
    mutationFn: addMomApi,
    onSuccess: () => {
      toast.success("MOM جدید با موفقیت ساخته شد.");
      queryClient.invalidateQueries("listMom");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { addMom, isLoading };
}
