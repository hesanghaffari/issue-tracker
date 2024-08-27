import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRouteUser = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userRole = Cookies.get("userRole");

    if (!token || userRole !== "user") {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

ProtectedRouteUser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRouteUser;
