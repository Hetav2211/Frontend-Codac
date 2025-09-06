// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Or use context/state

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
