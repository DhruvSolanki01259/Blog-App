import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/not-found";

  return (
    <div className='min-h-screen flex flex-col bg-[#FAF7F2] text-[#4B3B2A]'>
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
