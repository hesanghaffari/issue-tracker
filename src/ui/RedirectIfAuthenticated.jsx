import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RedirectIfAuthenticated = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const userRole = Cookies.get("userRole");

    if (authToken) {
      if (userRole === "user") {
        navigate("/dashboard");
      } else if (userRole === "admin" || userRole === "superadmin") {
        navigate("/dashboardadmin");
      }
    }
  }, [navigate]);

  return children;
};

export default RedirectIfAuthenticated;
