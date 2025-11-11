import { Link } from "react-router-dom";

const Footer = () => {
  const APP_NAME = import.meta.env.VITE_APP_NAME || "Blog App";
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-[#FFDAC6] text-[#4B3B2A] mt-12'>
      <div className='max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-12'>
        {/* Brand / About */}
        <div className='flex-1'>
          <h2 className='text-2xl font-bold text-[#7C6A0A] mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FA9500] to-[#EB6424]'>
            {APP_NAME}
          </h2>
          <p className='text-[#7C6A0A]/80 text-sm'>
            Share your knowledge, showcase your work, and connect with your
            audience on a modern blog platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-[#7C6A0A] mb-2'>
            Quick Links
          </h3>
          <ul className='space-y-2'>
            <li>
              <Link
                to='/'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-transform duration-200'>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-transform duration-200'>
                About
              </Link>
            </li>
            <li>
              <Link
                to='/advanced-search'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-transform duration-200'>
                Search
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-transform duration-200'>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Recent Blogs */}
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-[#7C6A0A] mb-2'>
            Recent Blogs
          </h3>
          <ul className='space-y-2'>
            <li>
              <Link
                to='/blogs/1'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-transform duration-200'>
                Understanding React Hooks
              </Link>
            </li>
            <li>
              <Link
                to='/blogs/2'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-transform duration-200'>
                Tailwind CSS Best Practices
              </Link>
            </li>
            <li>
              <Link
                to='/blogs/3'
                className='hover:text-[#EB6424] hover:translate-x-1 transition-transform duration-200'>
                Optimizing MERN Stack Apps
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='border-t border-[#BABD8D]/30 mt-6 py-4 text-center text-[#7C6A0A]/80 text-sm'>
        &copy; {currentYear} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
