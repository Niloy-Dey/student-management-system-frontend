import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Import Auth Context

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />; // Redirect to login if not authenticated
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />; // Redirect if role is not allowed

  return children;
};

export default ProtectedRoute;
