import { useMutation } from "@tanstack/react-query";
import { EditProfile as EditProfileApi } from "../../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useEditForm() {
  const { mutate: editprofile, isLoading } = useMutation({
    mutationFn: EditProfileApi,
    onSuccess: () => {
      toast.success("نام با موفقیت ویرایش شد..");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { editprofile, isLoading };
}
