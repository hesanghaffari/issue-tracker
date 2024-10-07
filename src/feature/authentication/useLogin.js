import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, verify as verifyApi } from "../../services/apiAuth"; // Assuming verify API is imported here
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async (user) => {
      Cookies.set("userEmail", user.email);
      if (user.isVerified) {
        const token = user.token;
        const id = user.id;
        const fullname = user.fullname;
        const userRole = user.role;

        // Set initial cookies from login API response
        Cookies.set("fullname", fullname);
        Cookies.set("authToken", token);
        Cookies.set("userRole", userRole);
        Cookies.set("userID", id);

        // Now, call the verify API to fetch license and company name
        try {
          const verifyResponse = await verifyApi(token); // Assuming verify API needs the token
          const { licenseCode, company } = verifyResponse;

          // Set additional cookies for license and company name
          Cookies.set("licenseCode", licenseCode);
          Cookies.set("company", company);

          // Proceed to the dashboard after setting all cookies
          queryClient.setQueryData(["user"], user.user);
          navigate("/dashboard");
          toast.success("ورود موفق!");
        } catch (verifyError) {
          toast.error("خطا در بازیابی اطلاعات لایسنس و شرکت.");
        }
      } else {
        toast.success("لطفا ایمیل خود را تایید کنید.");
        navigate("/verify-email");
      }
    },
    onError: (error) => {
      const errorMessage = error.message || "لطفا مجددا امتحان کنید.";
      toast.error(errorMessage);
    },
  });

  return { login, isPending };
}
