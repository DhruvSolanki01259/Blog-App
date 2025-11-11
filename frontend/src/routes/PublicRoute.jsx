// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  // if logged in, send to home page
  if (isAuthenticated) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;
