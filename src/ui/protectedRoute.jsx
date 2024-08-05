import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    console.log(token);

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
