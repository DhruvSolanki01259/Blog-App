import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

import About from "./pages/About";
import Contact from "./pages/Contact";
import AdvanceSearch from "./pages/AdvanceSearch";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const App = () => {
  return (
    <>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
      <Routes>
        <Route element={<Layout />}>
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
        </Route>

        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/login'
          element={<LogIn />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};

export default App;
