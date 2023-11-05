import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <span className=" loading loading-spinner loading-success loading-lg"></span>
    );
  }

  if (user) {
    return children;
  }

  return (
    <Navigate
      state={location.pathname}
      to="/login"
    ></Navigate>
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;