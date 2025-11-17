// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Not logged in? → Redirect to login and remember where user was trying to go
  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
        state={{ from: location }}
      />
    );
  }

  // If specific roles are required, check them
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
