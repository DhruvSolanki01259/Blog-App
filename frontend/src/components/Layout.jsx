import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useThemeStore } from "../store/theme.store";

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/not-found";
  const { theme } = useThemeStore();

  // Theme-based colors
  const bgColor = theme === "light" ? "bg-[#FAF7F2]" : "bg-[#1E1E2F]";
  const textColor = theme === "light" ? "text-[#4B3B2A]" : "text-[#CFCFCF]";

  return (
    <div className={`min-h-screen flex flex-col ${bgColor} ${textColor}`}>
      {!hideHeaderFooter && <Header />}

      {/* Main content */}
      <main className='flex-grow pt-20 px-6'>
        <Outlet />
      </main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
