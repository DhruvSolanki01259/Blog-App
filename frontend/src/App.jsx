import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdvanceSearch from "./pages/AdvanceSearch";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./components/Layout";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Blogs from "./pages/Blogs";
import DashBoard from "./pages/DashBoard";
import BlogDetails from "./components/BlogDetails";

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
            path='/blogs'
            element={<Blogs />}
          />
          <Route
            path='/blogs/:slug'
            element={<BlogDetails />}
          />

          {/* Auth Protected pages */}
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin-only route */}
          <Route
            path='/admin/dashboard'
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Public Auth Pages */}
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

        {/* 404 Fallback */}
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};

export default App;
