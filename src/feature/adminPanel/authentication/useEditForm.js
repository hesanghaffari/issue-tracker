import { useMutation } from "@tanstack/react-query";
import { EditProfile as EditProfileApi } from "../../../services/apiAuth";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function useEditForm() {
  const { mutate: editprofile, isLoading } = useMutation({
    mutationFn: EditProfileApi,
    onSuccess: (_, variables) => {
      const { fullname, phone } = variables;

      Cookies.set("fullname", fullname);
      Cookies.set("phone", phone);
      toast.success("پروفایل با موفقیت ویرایش شد.");
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { editprofile, isLoading };
}
