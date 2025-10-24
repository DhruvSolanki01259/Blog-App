import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Header />
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/login'
          element={<LogIn />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
