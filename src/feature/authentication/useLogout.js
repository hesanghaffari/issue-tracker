import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setIsPending(true);

    setTimeout(() => {
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
      });

      navigate("/login", { replace: true });

      setIsPending(false);
    }, 500);
  };

  return { logout, isPending };
}
