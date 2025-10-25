import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const APP_NAME = import.meta.env.VITE_APP_NAME || "Blog App";

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const tabAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };

  // Hard-coded theme for now
  const [theme, setTheme] = useState("light");

  return (
    <header className='w-full fixed top-0 left-0 z-30 bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#E5D9C4] shadow-sm'>
      <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4'>
        {/* 1. App Name */}
        <motion.h1
          onClick={() => handleNavigate("/")}
          className='text-2xl sm:text-3xl font-bold tracking-tight cursor-pointer whitespace-nowrap select-none bg-clip-text text-transparent bg-gradient-to-r from-[#FA9500] to-[#EB6424]'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          {APP_NAME}
        </motion.h1>

        {/* 2. Search Bar */}
        <div
          className={`hidden md:flex items-center gap-2 bg-white border border-[#E0C9A6] rounded-full px-3 py-1.5 w-64 shadow-sm transition-all duration-200 ${
            isSearchActive ? "ring-2 ring-[#EB6424]" : ""
          }`}>
          <Search className='w-4 h-4 text-[#7C6A0A]' />
          <input
            type='text'
            placeholder='Search...'
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
            className='w-full outline-none bg-transparent text-sm text-[#4B3B2A] placeholder-[#A69374]'
          />
        </div>

        {/* 3. Tabs */}
        <nav className='hidden md:flex items-center gap-6 text-[#4B3B2A] font-medium'>
          {[
            { label: "Advance-Search", path: "/advanced-search" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map((tab, i) => (
            <motion.a
              key={tab.path}
              onClick={() => handleNavigate(tab.path)}
              custom={i}
              variants={tabAnimation}
              initial='hidden'
              animate='visible'
              className='hover:text-[#EB6424] transition cursor-pointer'>
              {tab.label}
            </motion.a>
          ))}
        </nav>

        {/* 4. Day/Night & Signup Group */}
        <div className='hidden md:flex items-center gap-3'>
          {/* Day/Night Button */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className='w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF9F4] border border-[#E5D9C4] hover:bg-[#EB6424] hover:text-white transition text-[#7C6A0A]'>
            {theme === "light" ? (
              <Sun className='w-5 h-5' />
            ) : (
              <Moon className='w-5 h-5' />
            )}
          </button>

          {/* Sign Up Button */}
          <button
            onClick={() => handleNavigate("/signup")}
            className='px-5 py-2 rounded-full border-2 border-[#EB6424] text-[#EB6424] hover:bg-[#EB6424] hover:text-white font-semibold transition'>
            Sign Up
          </button>
        </div>

        {/* Mobile Buttons: Day/Night + Menu */}
        <div className='flex md:hidden items-center gap-2'>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className='w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF9F4] border border-[#E5D9C4] hover:bg-[#EB6424] hover:text-white transition text-[#7C6A0A]'>
            {theme === "light" ? (
              <Sun className='w-5 h-5' />
            ) : (
              <Moon className='w-5 h-5' />
            )}
          </button>

          <button
            className='p-2 rounded-md text-[#4B3B2A] hover:bg-[#F2E9E1] transition flex-shrink-0'
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className='md:hidden bg-[#FFF9F4] border-t border-[#E5D9C4] shadow-md'>
            <div className='flex flex-col px-6 py-4 space-y-3 text-[#4B3B2A] font-medium'>
              {[
                { label: "Advance-Search", path: "/advanced-search" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((tab, i) => (
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
              <motion.button
                onClick={() => handleNavigate("/signup")}
                custom={4}
                variants={tabAnimation}
                initial='hidden'
                animate='visible'
                className='px-5 py-2 rounded-md border-2 border-[#EB6424] text-[#EB6424] bg-white hover:bg-[#EB6424] hover:text-white font-semibold transition text-center'>
                Sign Up
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
