// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  // if not logged in, send to login page
  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
