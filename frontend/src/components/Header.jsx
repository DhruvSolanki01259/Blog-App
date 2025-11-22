import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Sun, Moon, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/auth.store";
import { useThemeStore } from "../store/theme.store";
import { useBlogStore } from "../store/user.blog.store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const APP_NAME = import.meta.env.VITE_APP_NAME || "Blog App";

  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { searchQuery, setSearchQuery } = useBlogStore();

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout?.();
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { label: "Blogs", path: "/blogs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const tabAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  // Theme-based classes
  const headerBg =
    theme === "light"
      ? "bg-[#FAF7F2]/80 border-[#E5D9C4]"
      : "bg-[#2B2B3A]/80 border-[#4B4B5A]";
  const textColor = theme === "light" ? "text-[#4B3B2A]" : "text-[#E0E0E0]";
  const inputBg =
    theme === "light"
      ? "bg-white border-[#E0C9A6]"
      : "bg-[#3A3A4A] border-[#5A5A6A]";
  const btnBg =
    theme === "light"
      ? "bg-[#FFF9F4] border-[#E5D9C4] text-[#7C6A0A]"
      : "bg-[#2B2B3A] border-[#4B4B5A] text-[#E0E0E0]";

  return (
    <header
      className={`w-full fixed top-0 left-0 z-30 backdrop-blur-md border-b shadow-sm ${headerBg}`}>
      <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4'>
        {/* LOGO */}
        <motion.h1
          onClick={() => handleNavigate("/")}
          className='text-2xl sm:text-3xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#FA9500] to-[#EB6424]'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          {APP_NAME}
        </motion.h1>

        {/* DESKTOP SEARCH */}
        <div
          className={`hidden lg:flex items-center gap-2 rounded-full px-3 py-1.5 w-64 shadow-sm transition-all duration-200 ${inputBg} ${
            isSearchActive ? "ring-2 ring-[#EB6424]" : ""
          }`}>
          <Search
            className={
              theme === "light"
                ? "w-4 h-4 text-[#7C6A0A]"
                : "w-4 h-4 text-[#E0E0E0]"
            }
          />
          <input
            type='text'
            placeholder='Search blogs...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              navigate("/advance-search");
            }}
            onFocus={() => {
              setIsSearchActive(true);
              navigate("/advance-search");
            }}
            onBlur={() => setIsSearchActive(false)}
            className='w-full outline-none bg-transparent text-sm'
          />
        </div>

        {/* DESKTOP NAV */}
        <nav
          className={`hidden lg:flex items-center gap-6 font-medium ${textColor}`}>
          {navLinks.map((tab, i) => (
            <motion.a
              key={tab.path}
              onClick={() => handleNavigate(tab.path)}
              custom={i}
              variants={tabAnimation}
              initial='hidden'
              animate='visible'
              className='hover:text-[#EB6424] cursor-pointer transition'>
              {tab.label}
            </motion.a>
          ))}
        </nav>

        {/* DESKTOP RIGHT */}
        <div className='hidden lg:flex items-center gap-3'>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EB6424] hover:text-white transition ${btnBg}`}>
            {theme === "light" ? (
              <Sun className='w-5 h-5' />
            ) : (
              <Moon className='w-5 h-5' />
            )}
          </button>

          {/* Auth Buttons */}
          {isAuthenticated && user ? (
            <motion.img
              src={user.profilePic || "/default-avatar.png"}
              alt={user.username}
              className='w-10 h-10 rounded-full border-2 border-[#EB6424] object-cover cursor-pointer hover:scale-105 transition'
              onClick={() => handleNavigate("/profile")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          ) : (
            <button
              onClick={() => handleNavigate("/signup")}
              className='px-5 py-2 rounded-full border-2 border-[#EB6424] hover:bg-[#EB6424] hover:text-white font-semibold transition'>
              Sign Up
            </button>
          )}
        </div>

        {/* MOBILE RIGHT */}
        <div className='flex lg:hidden items-center gap-2'>
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EB6424] hover:text-white transition ${btnBg}`}>
            {theme === "light" ? (
              <Sun className='w-5 h-5' />
            ) : (
              <Moon className='w-5 h-5' />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md ${textColor} hover:bg-opacity-10 hover:bg-current transition`}>
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={`lg:hidden shadow-md ${
              theme === "light"
                ? "bg-[#FFF9F4] border-t border-[#E5D9C4]"
                : "bg-[#2B2B3A] border-t border-[#4B4B5A]"
            }`}>
            <div
              className={`flex flex-col px-6 py-4 space-y-3 font-medium ${textColor}`}>
              {navLinks.map((tab, i) => (
                <motion.button
                  key={tab.path}
                  onClick={() => handleNavigate(tab.path)}
                  custom={i}
                  variants={tabAnimation}
                  initial='hidden'
                  animate='visible'
                  className='text-left rounded-md px-3 py-2 hover:bg-[#EB6424]/15 transition'>
                  {tab.label}
                </motion.button>
              ))}

              {/* Mobile Auth */}
              {isAuthenticated ? (
                <>
                  <motion.button
                    onClick={() => handleNavigate("/profile")}
                    custom={4}
                    variants={tabAnimation}
                    initial='hidden'
                    animate='visible'
                    className='flex items-center justify-center gap-2 px-5 py-2 rounded-md border-2 border-[#EB6424] hover:bg-[#EB6424] hover:text-white font-semibold transition'>
                    <User className='w-5 h-5' /> Profile
                  </motion.button>

                  <motion.button
                    onClick={handleLogout}
                    custom={5}
                    variants={tabAnimation}
                    initial='hidden'
                    animate='visible'
                    className='flex items-center justify-center gap-2 px-5 py-2 rounded-md border-2 border-[#E63946] hover:bg-[#E63946] hover:text-white font-semibold transition'>
                    <LogOut className='w-5 h-5' /> Logout
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => handleNavigate("/signup")}
                  custom={4}
                  variants={tabAnimation}
                  initial='hidden'
                  animate='visible'
                  className='px-5 py-2 rounded-md border-2 border-[#EB6424] hover:bg-[#EB6424] hover:text-white font-semibold transition'>
                  Sign Up
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
