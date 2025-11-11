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

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  return (
    <>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />

      <Routes>
        {/* All pages using common layout */}
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/advance-search'
            element={<AdvanceSearch />}
          />

          {/* Protected pages */}
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/contact'
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Public routes (auth pages) */}
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};

export default App;
