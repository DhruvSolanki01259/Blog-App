import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdvanceSearch from "./pages/AdvanceSearch";

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
          path='/about'
          element={<About />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='/advance-search'
          element={<AdvanceSearch />}
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
