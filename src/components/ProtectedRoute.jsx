// ProtectedRoute.jsx - Ensures routes are accessible only to authenticated users
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HydrateFallback } from "../components";

const ProtectedRoute = ({ children, authentication = true }) => {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authentication !== authStatus) navigate("/sign-in");
    if (!authentication && authentication !== authStatus) navigate("/");
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <HydrateFallback /> : <>{children}</>;
};

export default ProtectedRoute;

// PropTypes for type checking of component props
ProtectedRoute.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.bool,
};
