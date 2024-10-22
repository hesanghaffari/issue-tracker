import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRouteAdmin = ({ children, accessToUsersList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userRole = Cookies.get("userRole");

    if (!token || (userRole !== "admin" && userRole !== "superadmin")) {
      navigate("/login");
    }

    if (accessToUsersList && userRole !== "superadmin") {
      navigate("/login");
    }
  }, [navigate, accessToUsersList]);

  return children;
};

ProtectedRouteAdmin.propTypes = {
  children: PropTypes.node.isRequired,
  accessToUsersList: PropTypes.bool,
};

export default ProtectedRouteAdmin;
