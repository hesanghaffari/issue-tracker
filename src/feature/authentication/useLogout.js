import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setIsPending(true);

    // Simulate a delay to show pending state
    setTimeout(() => {
      // Clear all cookies
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
      });

      // Redirect to the login page
      navigate("/login", { replace: true });

      setIsPending(false);
    }, 500); // Adjust the delay as needed
  };

  return { logout, isPending };
}
