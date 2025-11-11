import React from "react";
import { useAuthStore } from "../store/auth.store";

const Home = () => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Home;
