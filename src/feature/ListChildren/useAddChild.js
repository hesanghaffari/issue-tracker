import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChild as addChildApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useAddChild() {
  const queryClient = useQueryClient();

  const { mutate: addChild, isLoading } = useMutation({
    mutationFn: addChildApi,
    onSuccess: () => {
      toast.success("یوزر جدید با موفقیت ساخته شد.");
      queryClient.invalidateQueries("listChild");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { addChild, isLoading };
}
